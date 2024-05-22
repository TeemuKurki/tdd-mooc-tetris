export class Board {
  width;
  height;
  initialRow;
  constructor(width, height) {
      this.width = width;
      this.height = height;
      this.initialRow = "...\n"
  }

  drop(icon) {
    this.initialRow = `.${icon}.\n`
 }

  toString() {
    let board = this.initialRow
    for (let y = 1; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            board += "."
        }
        board += "\n"
    }
    return board
  }
}
