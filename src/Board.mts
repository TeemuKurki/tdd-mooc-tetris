import { RotatingShape } from "./RotatingShape.mjs";

type Block = { x: number; y: number; icon: string[][], reserved: [x: number, y: number][] };

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
    this.block = { x: 0, y: 0, icon: [["."]], reserved: [] };
    this.prevBlocks = [];
    this.falling = false;
  }

  /**
   * Calculate the reserved cells for the current block.
   * Loop through the icon and add the x and y coordinates to the reserved array.
   */
  private calculateReserverd(): [x: number, y: number][] {
    const reserved: [x: number, y: number][] = [];
    for (let i = 0; i < this.block.icon.length; i++) {
      for (let j = 0; j < this.block.icon[i].length; j++) {
        if (this.block.icon[i][j] !== ".") {
          reserved.push([this.block.x + j, this.block.y + i]);
        }
      }
    }
    return reserved
  }

  drop(input: string | RotatingShape) {
    const icon = typeof input === "string" ? [[input]] : input.rows.map((r) => r.split(""));
    if (this.falling) {
      throw new Error("already falling");
    }
    this.falling = true;
    const center = Math.floor(this.width / 2) - (icon.length - 1);
    this.block = { x: center, y: 0, icon, reserved: [] };
    this.block.reserved = this.calculateReserverd();
  }

  moveLeft() {
    if (this.block.x > 0 && this.hasFalling()) {
      this.block.x--;
      this.block.reserved = this.calculateReserverd();
    }
  }
  moveRight() {
    if (this.block.x + this.block.icon[0].length < this.width && this.hasFalling()) {
      this.block.x++;
      this.block.reserved = this.calculateReserverd();
    }
  }

  tick() {

    const aboveReservedCell = this.prevBlocks.some((prevBlock) => {
      return prevBlock.reserved.some(([px, py]) => {
        return this.block.reserved.some(([cx, cy]) => {
          return cx === px && cy + 1 === py;
        });
      });
    });

    if (this.block.y === this.height - this.block.icon.length || aboveReservedCell) {
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
      this.insertBlock(board, block.icon, block.y, block.x);
    });
    this.insertBlock(board, this.block.icon, this.block.y, this.block.x);
    return board.map((b) => b.join("")).join("\n") + "\n";
  }
}
