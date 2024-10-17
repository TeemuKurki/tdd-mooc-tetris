import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = new RotatingShape([".T.", "TTT", "..."]);
  static I_SHAPE = new RotatingShape([".....", ".....", "IIII.", ".....", "....."], 2);
  static O_SHAPE = new RotatingShape([".OO", ".OO", "..."], 1);
  static L_SHAPE = new RotatingShape(["LLL", "L..", "..."]);
  static J_SHAPE = new RotatingShape(["JJJ", "..J", "..."]);
  static S_SHAPE = new RotatingShape([".SS", "SS.", "..."], 2);
  static Z_SHAPE = new RotatingShape(["ZZ.", ".ZZ", "..."], 2);
}
