import { describe, it } from "vitest";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { expect } from "chai";
import { ScoreManager } from "../src/ScoreManager.js";

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
       ......
       ......
       ......`
    );
  });

  it("should not clear a line until bluck is no longer falling", () => {
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
    repeat(4, () => {
      board.tick();
    });
    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       ......
       OOOOOO
       OOOOOO`
    );
  });
  it("should only clear completed line", () => {
    const board = new Board(6, 6);
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft()
    board.moveLeft()
    repeat(5, () => {
      board.tick();
    });
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
       OO....
       OO....
       ......
       ......`
    );
  });
  it("Should increase score when line is cleared", () => {
    const scoreManager = new ScoreManager("main-score");
    const board = new Board(6, 6);
    board.addScoreObserver(scoreManager);

    expect(scoreManager.getScore()).to.equal(0);
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
    expect(scoreManager.getScore()).to.equal(0);
    repeat(5, () => {
      board.tick();
    });
    expect(scoreManager.getScore()).to.equal(100);
  });
});