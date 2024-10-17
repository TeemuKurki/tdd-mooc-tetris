import { RotatingShape } from "./RotatingShape.mjs";

type Block = { x: number; y: number; icon: string[][], shape: RotatingShape, reserved: [x: number, y: number][] };

export class Board {
  width: number;
  height: number;
  board: string[][];
  block: Block;
  prevBlocks: Block[];
  falling: boolean;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = Array(height).fill(Array(width).fill("."));
    this.block = { x: 0, y: 0, icon: [["."]], shape: RotatingShape.fromString("."), reserved: [] };
    this.prevBlocks = [];
    this.falling = false;
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
    this.block = { x: center, y: 0, icon: input.toBlock(), shape: input, reserved: [] };
    this.block.reserved = this.calculateReserverd();
  }

  moveLeft() {
    if (this.block.x > 0 && !this.moveBlocked(-1,0) && this.hasFalling()) {
      this.block.x--;
      this.block.reserved = this.calculateReserverd();
    }
  }
  moveRight() {
    if (this.block.x + this.block.shape.width < this.width && !this.moveBlocked(1,0) && this.hasFalling()) {
      this.block.x++;
      this.block.reserved = this.calculateReserverd();
    }
  }

  moveDown() {
    this.tick()
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

  tick() {
    const aboveReservedCell = this.moveBlocked(0, 1);
    const atBottom = this.block.reserved.some(([_x, y]) => y === this.height - 1);


    if (atBottom || aboveReservedCell) {
      this.falling = false;
      while (this.block.icon.at(-1)?.every((s) => s === ".")) {
        const deleted = this.block.icon.splice(this.block.icon.length - 1, 1);
        this.block.icon.unshift(deleted[0]);
      }
      this.prevBlocks.push(this.block);
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
      this.insertResrvedBlock(board, block.icon.flat().find(i => i !== ".")!, block.reserved);
    });
    this.insertResrvedBlock(board, this.block.icon.flat().find(i => i !== ".")!, this.block.reserved);
    return board.map((b) => b.join("")).join("\n") + "\n";
  }
}
