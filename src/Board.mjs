export class Board {
  width;
  height;
  constructor(width, height) {
      this.width = width;
      this.height = height;
      this.block = [[-1,-1], ""]
  }

  drop(icon) {
    this.block = [[1,0], icon]
 }

 tick(){
    if(this.block[0][1] > -1) {
        this.block[0][1] += 1
    }
 }

  toString() {
    let board = ""
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            if(x === this.block[0][0] && y === this.block[0][1]){
                board += this.block[1]
            }
            else {
                board += "."
            }
        }
        board += "\n"
    }
    return board
  }
}
