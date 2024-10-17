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

function repeat(amount: number, cb: () => void) {
  for (let i = 0; i < amount; i++) {
    cb();
  }
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

describe("The L Shape", () => {
  test("initial orientation", () => {
    const shape = Tetromino.L_SHAPE;
    expect(shape.toString()).to.equalShape(
      `LLL
      L..
      ...`
    );
  });
  
  test("can be rotated right/clockwise", () => {
    const shape = Tetromino.L_SHAPE;
    expect(shape.rotateRight().toString()).to.equalShape(
      `.LL
      ..L
      ..L`
    );
  });
  
  test("can be rotated left/counter-clockwise", () => {
    const shape = Tetromino.L_SHAPE;
    expect(shape.rotateLeft().toString()).to.equalShape(
      `L..
      L..
      LL.`
    );
  });
  
  test("has 4 distinct orientations", () => {
    const shape = Tetromino.L_SHAPE;
    expect(distinctOrientations(shape).size).to.equal(4);
  });
  
  test("Can be rotated right while falling", () => {
    const shape = Tetromino.L_SHAPE;
    const board = new Board(10, 6);
    board.drop(shape);
    board.tick();
    board.rotateBlockRight()
    expect(board.toString()).to.equalShape(
      `..........
        ....LL....
        .....L....
        .....L....
        ..........
        ..........`
    );
  })
})
describe("The J Shape", () => {
  test("initial orientation", () => {
    const shape = Tetromino.J_SHAPE;
    expect(shape.toString()).to.equalShape(
      `JJJ
      ..J
      ...`
    );
  });
  
  test("can be rotated right/clockwise", () => {
    const shape = Tetromino.J_SHAPE;
    expect(shape.rotateRight().toString()).to.equalShape(
      `..J
      ..J
      .JJ`
    );
  });
  
  test("can be rotated left/counter-clockwise", () => {
    const shape = Tetromino.J_SHAPE;
    expect(shape.rotateLeft().toString()).to.equalShape(
      `JJ.
      J..
      J..`
    );
  });
  
  test("has 4 distinct orientations", () => {
    const shape = Tetromino.J_SHAPE;
    expect(distinctOrientations(shape).size).to.equal(4);
  });
  
  test("Can be rotated right while falling", () => {
    const shape = Tetromino.J_SHAPE;
    const board = new Board(10, 6);
    board.drop(shape);
    board.tick();
    board.rotateBlockRight()
    expect(board.toString()).to.equalShape(
      `..........
        .....J....
        .....J....
        ....JJ....
        ..........
        ..........`
    );
  })
})
describe("The S Shape", () => {
  test("initial orientation", () => {
    const shape = Tetromino.S_SHAPE;
    expect(shape.toString()).to.equalShape(
      `.SS
      SS.
      ...`
    );
  });
  
  test("can be rotated right/clockwise", () => {
    const shape = Tetromino.S_SHAPE;
    expect(shape.rotateRight().toString()).to.equalShape(
      `.S.
      .SS
      ..S`
    );
  });
  
  test("can be rotated left/counter-clockwise", () => {
    const shape = Tetromino.S_SHAPE;
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.S.
      .SS
      ..S`
    );
  });
  
  test("has 2 distinct orientations", () => {
    const shape = Tetromino.S_SHAPE;
    expect(distinctOrientations(shape).size).to.equal(2);
  });
  
  test("Can be rotated right while falling", () => {
    const shape = Tetromino.S_SHAPE;
    const board = new Board(10, 6);
    board.drop(shape);
    board.tick();
    board.rotateBlockRight()
    expect(board.toString()).to.equalShape(
      `..........
        ....S.....
        ....SS....
        .....S....
        ..........
        ..........`
    );
  })
})
describe("The Z Shape", () => {
  test("initial orientation", () => {
    const shape = Tetromino.Z_SHAPE;
    expect(shape.toString()).to.equalShape(
      `ZZ.
      .ZZ
      ...`
    );
  });
  
  test("can be rotated right/clockwise", () => {
    const shape = Tetromino.Z_SHAPE;
    expect(shape.rotateRight().toString()).to.equalShape(
      `..Z
      .ZZ
      .Z.`
    );
  });
  
  test("can be rotated left/counter-clockwise", () => {
    const shape = Tetromino.Z_SHAPE;
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..Z
      .ZZ
      .Z.`
    );
  });
  
  test("has 2 distinct orientations", () => {
    const shape = Tetromino.Z_SHAPE;
    expect(distinctOrientations(shape).size).to.equal(2);
  });
  
  test("Can be rotated right while falling", () => {
    const shape = Tetromino.Z_SHAPE;
    const board = new Board(10, 6);
    board.drop(shape);
    board.tick();
    board.rotateBlockRight()
    expect(board.toString()).to.equalShape(
      `..........
        .....Z....
        ....ZZ....
        ....Z.....
        ..........
        ..........`
    );
  })
})

describe("Wallkick tests", () => {
  const shape = Tetromino.I_SHAPE;

  test("Will wall kick when rotated right on left end", () => {
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
  test("Will wall kick when rotated right on right end", () => {
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
  test("Will wall kick when rotated left on left end", () => {
    const board = new Board(10, 6);
    board.drop(shape);
    board.tick();
    board.rotateBlockRight();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.rotateBlockLeft();
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ..........
        IIII......
        ..........
        ..........`
    );
  })
  test("Will wall kick when rotated left on right end", () => {
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
    board.rotateBlockLeft()
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ..........
        ......IIII
        ..........
        ..........`
    );
  })
  test("Will wallkick right end when hitting other tetromino", () => {
    const board = new Board(10, 6);
    repeat(2, () => {
      board.drop(Tetromino.O_SHAPE);
      repeat(4, () => {
        board.moveRight();
      })
      repeat(5, () => {
        board.tick();
      });
    })
    board.drop(shape);
    board.rotateBlockRight();
    board.tick();
    repeat(5, () => {
      board.moveRight();
    })
    board.rotateBlockRight();
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ........OO
        ....IIIIOO
        ........OO
        ........OO`
    );
  })
  test("Will wallkick left end when hitting other tetromino", () => {
    const board = new Board(10, 6);
    repeat(2, () => {
      board.drop(Tetromino.O_SHAPE);
      repeat(4, () => {
        board.moveLeft();
      })
      repeat(5, () => {
        board.tick();
      });
    })
    board.drop(shape);
    board.rotateBlockRight();
    board.tick();
    repeat(5, () => {
      board.moveLeft();
    })
    board.rotateBlockRight();
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        OO........
        OOIIII....
        OO........
        OO........`
    );
  })
  test("Will wallkick right end when hitting other tetromino left rotation", () => {
    const board = new Board(10, 6);
    repeat(2, () => {
      board.drop(Tetromino.O_SHAPE);
      repeat(4, () => {
        board.moveRight();
      })
      repeat(5, () => {
        board.tick();
      });
    })
    board.drop(shape);
    board.rotateBlockRight();
    board.tick();
    repeat(5, () => {
      board.moveRight();
    })
    board.rotateBlockLeft();
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        ........OO
        ....IIIIOO
        ........OO
        ........OO`
    );
  })
  test("Will wallkick left end when hitting other tetromino left rotation", () => {
    const board = new Board(10, 6);
    repeat(2, () => {
      board.drop(Tetromino.O_SHAPE);
      repeat(4, () => {
        board.moveLeft();
      })
      repeat(5, () => {
        board.tick();
      });
    })
    board.drop(shape);
    board.rotateBlockRight();
    board.tick();
    repeat(5, () => {
      board.moveLeft();
    })
    board.rotateBlockLeft();
    expect(board.toString()).to.equalShape(
      `..........
        ..........
        OO........
        OOIIII....
        OO........
        OO........`
    );
  })
  test("Will not rotate if no space", () => {
    const board = new Board(10, 6);
    board.drop(Tetromino.O_SHAPE);
    board.moveRight();
    board.moveRight();
    repeat(5, () => {
      board.tick();
    });
    board.drop(shape);
    board.rotateBlockRight();
    repeat(4, () => {
      board.moveRight();
    })
    board.moveRight()
    board.tick();
    board.tick();
    const target = 
       `..........
        ..........
        ........I.
        ........I.
        ......OOI.
        ......OOI.`
    expect(board.toString()).to.equalShape(target);
    board.rotateBlockLeft()
    expect(board.toString()).to.equalShape(target);
    board.rotateBlockLeft()
    expect(board.toString()).to.equalShape(target);
  })
});
