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
    test("Do not move tetromine outsite borders", () => {
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
    test("Do not move at bottom", () => {
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
    test("Do not allow move left through another block", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveLeft();
      move(5, () => {
        board.tick();  
      })
      board.drop(Tetromino.T_SHAPE);
      board.moveRight();
      board.moveRight();
      board.moveRight();
      move(3, () => {
        board.tick();  
      })
      move(5 ,() => {
        board.moveLeft();
      })
      board.tick();
      expect(board.toString()).to.equalShape(
        `..........
        ..........
        ..........
        .....T....
        ...TTTT...
        ..TTT.....`
      );
    });
  });
  describe("Move to right", () => {
    test("Move tetromine right", () => {
      board.drop(Tetromino.T_SHAPE);
      expect(board.toString()).to.equalShape(
        `....T.....
        ...TTT....
        ..........
        ..........
        ..........
        ..........`
      );
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `.....T....
        ....TTT...
        ..........
        ..........
        ..........
        ..........`
      );
    });
    test("Do not move tetromine outsite borders", () => {
      board.drop(Tetromino.T_SHAPE);
      move(10, () => {
        board.moveRight();
      });
      expect(board.toString()).to.equalShape(
        `........T.
        .......TTT
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
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `..........
        ..........
        .....T....
        ....TTT...
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
        board.moveRight();
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
    test("Do not move right through another tetromine", () => {
      board.drop(Tetromino.T_SHAPE);
      board.moveRight();
      board.moveRight();
      move(10, () => {
        board.tick();
      });

      board.drop(Tetromino.T_SHAPE);
      board.moveLeft();
      board.moveLeft();
      move(3, () => {
        board.tick()
      })
      board.moveRight();
      board.moveRight();
      expect(board.toString()).to.equalShape(
        `..........
        ..........
        ..........
        ....T.....
        ...TTTT...
        .....TTT..`
      ); 
    });
  });
  describe.skip("Mode down", () => {
    test("Move tetromine down", () => {
      board.drop(Tetromino.T_SHAPE);
      expect(board.toString()).to.equalShape(
        `....T.....
        ...TTT....
        ..........
        ..........
        ..........
        ..........`
      );
      board.moveDown()
      expect(board.toString()).to.equalShape(
        `..........
        ....T.....
        ...TTT....
        ..........
        ..........
        ..........`
      );
    });
    test("Do not move tetromine outsite borders", () => {
      board.drop(Tetromino.T_SHAPE);
      move(10, () => {
        board.moveDown();
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
    test("Allow moving during drop", () => {
      board.drop(Tetromino.T_SHAPE);
      board.tick();
      board.tick();
      board.moveDown();
      expect(board.toString()).to.equalShape(
        `..........
        ..........
        ..........
        ....T.....
        ...TTT....
        ..........`
      );
    });
    test("Do not allow moving down through another tetromine", () => {
      board.drop(Tetromino.T_SHAPE);
      move(10, () => {
        board.tick();
      });
      board.drop(Tetromino.T_SHAPE);
      board.tick();
      board.moveDown();
      board.moveDown();
      expect(board.toString()).to.equalShape(
        `..........
        ..........
        ....T.....
        ...TTT....
        ....T.....
        ...TTT....`
      );
    });
  });
});
