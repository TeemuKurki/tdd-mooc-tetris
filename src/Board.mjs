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

 atBottom(currentBlock){
    return this.blocks.some(block => currentBlock[0][0] === block[0][0] && currentBlock[0][1] === block[0][1] - 1) || currentBlock[0][1] === this.height -1
 }

 tick(){
    if(this.block[0][1] > -1 && !this.atBottom(this.block)) {
        this.block[0][1] += 1
    }
    // Allow falling one tick after touching bottom
    if(this.blockAtBottom){
        this.falling = false
    }   
    if(this.atBottom(this.block)){
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
