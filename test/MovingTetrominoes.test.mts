import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function move(amount: number, cb: () => void) {
  for (let i = 0; i < amount; i++) {
    cb();
  }
}

describe("Moving tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });
  describe("Move to left", () => {
    test("Move tetromine left", () => {
      board.drop(Tetromino.T_SHAPE);
      expect(board.toString()).to.equalShape(
        `....T.....
        ...TTT....
        ..........
        ..........
        ..........
        ..........`
      );
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `...T......
        ..TTT.....
        ..........
        ..........
        ..........
        ..........`
      );
    });
    test("Do not tetromine move outsite borders", () => {
      board.drop(Tetromino.T_SHAPE);
      move(10, () => {
        board.moveLeft();
      });
      expect(board.toString()).to.equalShape(
        `.T........
        TTT.......
        ..........
        ..........
        ..........
        ..........`
      );
    });
    test("Allow moving during drop", () => {
      board.drop(Tetromino.T_SHAPE);
      board.tick();
      board.tick();
      board.moveLeft();
      expect(board.toString()).to.equalShape(
        `..........
        ..........
        ...T......
        ..TTT.....
        ..........
        ..........`
      );
    });
    test("Do not moove at bottom", () => {
      board.drop(Tetromino.T_SHAPE);
      move(10, () => {
        board.tick();
      });
      move(10, () => {
        board.moveLeft();
      });
      expect(board.toString()).to.equalShape(
        `..........
        ..........
        ..........
        ..........
        ....T.....
        ...TTT....`
      );
    });
  });
});
