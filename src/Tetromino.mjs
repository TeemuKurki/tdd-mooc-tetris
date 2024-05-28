import { RotatingShape } from "./RotatingShape.mjs";

export const Tetromino = {
    T_SHAPE: RotatingShape.fromString(
        `.T.
         TTT
         ...`
    ),
    I_SHAPE: RotatingShape.fromString(
        `.....
         .....
         IIII.
         .....
         .....`
    )
}