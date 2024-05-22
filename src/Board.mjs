export class Board {
  width;
  height;
  block;
  falling;
  constructor(width, height) {
      this.width = width;
      this.height = height;
      this.block = [[-1,-1], ""]
      this.falling = false
  }

  drop(icon) {
    if(this.block[0][1] > -1) {
        throw "already falling"
    }
    this.block = [[1,0], icon]
    this.falling = true
}

 tick(){
    if(this.block[0][1] > -1) {
        this.block[0][1] += 1
    }
 }
 
  hasFalling(){
    return this.falling
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
