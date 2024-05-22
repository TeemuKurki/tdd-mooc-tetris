export class Board {
  width;
  height;
  blocks;
  falling;
  blockAtBottom;
  constructor(width, height) {
      this.width = width;
      this.height = height;
      this.blocks = [[[-1,-1], ""]]
      this.falling = false
      this.blockAtBottom = false
  }

  get block(){
    return this.blocks[this.blocks.length-1]
  }
  set block(position){
    this.blocks.push(position)
  }

  drop(icon) {
    if(this.falling) {
        throw "already falling"
    }
    this.block = [[1,0], icon]
    this.falling = true
    this.blockAtBottom = false
    
}

 tick(){
    if(this.block[0][1] > -1 && this.block[0][1] !== this.height -1) {
        this.block[0][1] += 1
    }
    // Allow falling one tick after touching bottom
    if(this.blockAtBottom){
        this.falling = false
    }   
    if(this.block[0][1] === this.height -1){
        this.blockAtBottom = true
    } 
 }
 
  hasFalling(){
    return this.falling
  }
 
  toString() {
    let board = ""
    for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
            const match = this.blocks.find(block => x === block[0][0] && y === block[0][1]) 
            if(match){
                board += match[1]
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
