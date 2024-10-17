import { describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";
import { Board } from "../src/Board.mjs";
import type { RotatingShape } from "../src/RotatingShape.mjs";

function distinctOrientations(shape: RotatingShape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft = goingLeft.rotateLeft();
  }
  return distinct;
}

describe("The T shape", () => {
  const shape = Tetromino.T_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.T.
       TTT
       ...`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.T.
       .TT
       .T.`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.T.
       TT.
       .T.`
    );
  });

  test("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });

  test("Can be rotated right while falling", () => {
    const board = new Board(10, 6);
    board.drop(shape);
    board.tick();
    board.rotateBlockRight()
    expect(board.toString()).to.equalShape(
      `..........
        ....T.....
        ....TT....
        ....T.....
        ..........
        ..........`
    );
  })
  test("Can be rotated left while falling", () => {
    const board = new Board(10, 6);
    board.drop(shape);
    board.tick();
    board.rotateBlockLeft()
    expect(board.toString()).to.equalShape(
      `..........
        ....T.....
        ...TT.....
        ....T.....
        ..........
        ..........`
    );
  })
  test("Rotated block keep falling until bottom", () => {
    const board = new Board(10, 6);
    board.drop(shape);
    board.tick();
    board.rotateBlockRight();
    board.rotateBlockRight();
    board.tick();
    board.tick();
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ..........
        ..........
        ...TTT....
        ....T.....`
    );
  })
});

describe("The I shape", () => {
  const shape = Tetromino.I_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.....
       .....
       IIII.
       .....
       .....`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..I..
       ..I..
       ..I..
       ..I..
       .....`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..I..
       ..I..
       ..I..
       ..I..
       .....`
    );
  });

  test("Can be rotated right while falling", () => {
    const board = new Board(10, 6);
    board.drop(shape);
    board.tick();
    board.rotateBlockRight()
    expect(board.toString()).to.equalShape(
      `..........
        ...I......
        ...I......
        ...I......
        ...I......
        ..........`
    );
  })
  test("Can be rotated left while falling", () => {
    const board = new Board(10, 6);
    board.drop(shape);
    board.tick();
    board.rotateBlockLeft()
    expect(board.toString()).to.equalShape(
      `..........
        ...I......
        ...I......
        ...I......
        ...I......
        ..........`
    );
  })
  test("Rotated block keep falling until bottom", () => {
    const board = new Board(10, 6);
    board.drop(shape);
    board.tick();
    board.rotateBlockRight();
    board.tick();
    board.tick();
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ...I......
        ...I......
        ...I......
        ...I......`
    );
  })

  test("Will wall kick when rotated right", () => {
    const board = new Board(10, 6);
    board.drop(shape);
    board.tick();
    board.rotateBlockRight();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.rotateBlockRight();
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ..........
        IIII......
        ..........
        ..........`
    );
  })
  test("Will wall kick when rotated left", () => {
    const board = new Board(10, 6);
    board.drop(shape);
    board.tick();
    board.rotateBlockRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.rotateBlockRight()
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ..........
        ......IIII
        ..........
        ..........`
    );
  })
  
  test("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});

describe("The O shape", () => {
  const shape = Tetromino.O_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  test("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  test("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  test("has 1 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
});
