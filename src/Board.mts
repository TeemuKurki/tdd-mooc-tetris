import { RotatingShape } from "./RotatingShape.mjs";
import { ScoreManager } from "./ScoreManager.js";
import {  SuffleBag } from "./SuffleBag.js";
import { Tetromino } from "./Tetromino.mjs";

type Block = { x: number; y: number; shape: RotatingShape, reserved: [x: number, y: number][] };

export class Board {
  width: number;
  height: number;
  board: string[][];
  block: Block;
  prevBlocks: Block[];
  falling: boolean;
  private observers: ScoreManager[];
  suffleBag: SuffleBag;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = Array(height).fill(Array(width).fill("."));
    this.block = { x: 0, y: 0, shape: RotatingShape.fromString("."), reserved: [] };
    this.prevBlocks = [];
    this.falling = false;
    this.observers = [];
    this.suffleBag = new SuffleBag([0, 1, 2, 3, 4, 5, 6]);
  }

  public addScoreObserver(observer: ScoreManager) {
    this.observers.push(observer);
  }
  public removeScoreObserver(observer: ScoreManager) {
    this.observers = this.observers.filter(obs => obs.id !== observer.id);
  }
  private addScore(linesCleared: number): void {
    for (const observer of this.observers) {
      observer.addScore(linesCleared);
    }
  }



  getRandomBlock(): RotatingShape{
    const val = this.suffleBag.draw();
    switch (val) {
      case 0:
        return Tetromino.O_SHAPE
      case 1:
        return Tetromino.I_SHAPE
      case 2:
        return Tetromino.J_SHAPE
      case 3:
        return Tetromino.L_SHAPE
      case 4:
        return Tetromino.S_SHAPE
      case 5:
        return Tetromino.Z_SHAPE
      default:
        return Tetromino.T_SHAPE
    }
  }

  public spawnBlock() {
    const randomBlock = this.getRandomBlock();
    this.drop(randomBlock);
  }
  
  /**
   * Calculate the reserved cells for the current block.
   * Loop through the icon and add the x and y coordinates to the reserved array.
   */
  private calculateReserverd(): [x: number, y: number][] {
    const reserved: [x: number, y: number][] = [];
    for (let i = 0; i < this.block.shape.height; i++) {
      for (let j = 0; j < this.block.shape.width; j++) {
        if (this.block.shape.toBlock()[i][j] !== ".") {
          reserved.push([this.block.x + j, this.block.y + i]);
        }
      }
    }
    return reserved
  }

  drop(input: RotatingShape) {
    if (this.falling) {
      throw new Error("already falling");
    }
    this.falling = true;
    const center = Math.floor(this.width / 2) - (input.height - 1);
    this.block = { x: center, y: 0,  shape: input, reserved: [] };
    this.block.reserved = this.calculateReserverd();
  }

  moveLeft(): boolean {
    const leftEnd = Math.min(...this.block.reserved.map(([x]) => x));  
    if (leftEnd > 0 && !this.moveBlocked(-1,0) && this.hasFalling()) {
      this.block.x--;
      this.block.reserved = this.calculateReserverd();
      return true;
    }
    return false
  }
  moveRight(): boolean {
    const rightEnd = Math.max(...this.block.reserved.map(([x]) => x));
    if (rightEnd + 1 < this.width && !this.moveBlocked(1,0) && this.hasFalling()) {
      this.block.x++;
      this.block.reserved = this.calculateReserverd();
      return true;
    }
    return false
  }

  moveDown() {
    this.tick()
  }

  private checkAvailableCell(x: number, y: number, checkInbounds?: boolean): boolean {
    const inBounds = x >= 0 && x < this.width && y >= 0 && y < this.height;
    if (checkInbounds && !inBounds) {
      return false;
    }
    const inAnotherBlock = this.prevBlocks.some((prevBlock) => {
      return prevBlock.reserved.some(([px, py]) => {
        return x === px && y === py;
      })
    })
    return !inAnotherBlock;
  }

  private handleWallKick(lastKick?: "left" | "right"): boolean{
    //wall kick left end
    const leftEndCell = this.block.reserved.reduce((maxItem, curr) => {
      return curr[0] < maxItem[0] ? curr : maxItem;
    }, this.block.reserved[0]);
    const inAnotherBlockLeft = !this.checkAvailableCell(leftEndCell[0], leftEndCell[1], false);
    if(inAnotherBlockLeft){
      if(lastKick === "right"){
        return false;
      }

      this.block.x = this.block.x + 1;
      this.block.reserved = this.calculateReserverd();
      return this.handleWallKick("left"); 
    }


    const leftEnd = Math.min(...this.block.reserved.map(([x]) => x));  
    if(leftEnd < 0){
      this.block.x = this.block.x + Math.abs(leftEnd);
      this.block.reserved = this.calculateReserverd();
    }
    //wall kick right end
    const rightEndCell = this.block.reserved.reduce((maxItem, curr) => {
      return curr[0] > maxItem[0] ? curr : maxItem;
    }, this.block.reserved[0]);
    const inAnotherBlock = !this.checkAvailableCell(rightEndCell[0], rightEndCell[1], false);
    if(inAnotherBlock){
      if(lastKick === "left"){
        return false;
      }
      this.block.x = this.block.x - 1;
      this.block.reserved = this.calculateReserverd();
      return this.handleWallKick("right");
    }
    const rightEnd = Math.max(...this.block.reserved.map(([x]) => x));
    if(rightEnd >= this.width){
      this.block.x = this.block.x - (rightEnd - this.width + 1);
      this.block.reserved = this.calculateReserverd();
      return this.handleWallKick("right");
    }
    return true;
  }

  rotateBlockRight(): boolean{
    if (this.hasFalling()) {
      this.block.shape = this.block.shape.rotateRight();
      this.block.reserved = this.calculateReserverd();
      const success = this.handleWallKick();
      if(!success){
        return this.rotateBlockLeft();
      }
      return success;
    }
    return false;
  }
  rotateBlockLeft(): boolean{
    if (this.hasFalling()) {
      this.block.shape = this.block.shape.rotateLeft();
      this.block.reserved = this.calculateReserverd();
      const success = this.handleWallKick();
      if(!success){
        return this.rotateBlockRight();
      }
      return success;
    }
    return false;
  }
  
  private moveBlocked(x?: number, y?: number): boolean {
    return this.prevBlocks.some((prevBlock) => {
      return prevBlock.reserved.some(([px, py]) => {
        return this.block.reserved.some(([cx, cy]) => {
          return cx + (x ?? 0) === px && cy + (y ?? 0) === py;
        });
      });
    });
    
  }

  clearLine() {
    const fullRows = this.board.map((row, rowIndex) => {
      const full = row.every((cell, cellIndex) => {
        return !this.checkAvailableCell(cellIndex, rowIndex);
      });
      if (full) {
        return rowIndex;
      }
      return false
    }).filter((row) => row !== false);
    fullRows.forEach((row) => {
      this.prevBlocks.forEach((block) => {
        block.reserved = block.reserved.filter(([_x, y]) => y !== row);
      });
    });
    this.addScore(fullRows.length);
    return fullRows;
  }

  tick() {
    const aboveReservedCell = this.moveBlocked(0, 1);
    const atBottom = this.block.reserved.some(([_x, y]) => y === this.height - 1);


    if (atBottom || aboveReservedCell) {
      this.falling = false;
      this.prevBlocks.push(this.block);
      this.clearLine()
    } else {
      this.block.y++;
      this.block.reserved = this.calculateReserverd();
    }
  }

  hasFalling() {
    return this.falling;
  }

  insertBlock(board: string[][], block: string[][], startRow: number, startCol: number) {
    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j < block[i].length; j++) {
        board[startRow + i][startCol + j] = block[i][j];
      }
    }
  }
  insertResrvedBlock(board: string[][], icon: string, reserved: [x: number, y: number][]) {
    reserved.forEach(([x, y]) => {
      board[y][x] = icon;
    })
  }

  createBoard() {
    const board: string[][] = [];
    for (let row = 0; row < this.height; row++) {
      board.push([]);
      for (let column = 0; column < this.width; column++) {
        board[row].push(".");
      }
    }
    return board;
  }

  toString() {
    const board = this.createBoard();
    this.prevBlocks.forEach((block) => {
      const icon = block.shape.toBlock();
      this.insertResrvedBlock(board, icon.flat().find(i => i !== ".")!, block.reserved);
    });
    const icon = this.block.shape.toBlock();
    this.insertResrvedBlock(board, icon.flat().find(i => i !== ".")!, this.block.reserved);
    return board.map((b) => b.join("")).join("\n") + "\n";
  }
}
