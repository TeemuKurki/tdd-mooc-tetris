import { describe, it } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { expect } from "chai";

function repeat(amount: number, cb: () => void) {
  for (let i = 0; i < amount; i++) {
    cb();
  }
}

describe("ClearLine tests", () => {
  it("should clear a line when it is full", () => {
    const board = new Board(6, 6);
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft()
    board.moveLeft()
    repeat(5, () => {
      board.tick();
    });
    board.drop(Tetromino.O_SHAPE);
    board.moveRight()
    board.moveRight()
    repeat(5, () => {
      board.tick();
    });
    board.drop(Tetromino.O_SHAPE);
    repeat(5, () => {
      board.tick();
    });
    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       ......`
    );
  });
});