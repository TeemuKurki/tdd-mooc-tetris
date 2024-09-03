import { RotatingShape } from "./RotatingShape.mjs";

type Block = { x: number; y: number; icon: string[][] };

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
    this.block = { x: 0, y: 0, icon: [["."]] };
    this.prevBlocks = [];
    this.falling = false;
  }

  drop(input: string | RotatingShape) {
    const icon = typeof input === "string" ? [[input]] : input.rows.map((r) => r.split(""));
    if (this.falling) {
      throw new Error("already falling");
    }
    this.falling = true;
    const center = Math.floor(this.width / 2) - (icon.length - 1);
    this.block = { x: center, y: 0, icon };
  }

  tick() {
    const abovePrevBlock = this.prevBlocks.some(
      (prevBlock) => prevBlock.x === this.block.x && prevBlock.y === this.block.y + 1
    );
    if (this.block.y === this.height - 1 || abovePrevBlock) {
      this.falling = false;
      this.prevBlocks.push(this.block);
    } else {
      this.block.y++;
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
