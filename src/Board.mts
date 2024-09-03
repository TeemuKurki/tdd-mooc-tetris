export class Board {
  width: number;
  height: number;
  block: {x: number, y: number, icon: string};
  falling: boolean;
  constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
      this.block = {x: 0, y: 0, icon: "."};
      this.falling = false;
  }

  drop(icon: string) {
    if (this.falling) {
        throw new Error("already falling");
    }
    this.falling = true;
    const center = Math.floor(this.width / 2);
    this.block = {x: center, y: 0, icon};
  }

  tick() {
    this.block.y++;
  }

  hasFalling() {
    return this.falling;
  }

  toString() {
    let result = "";
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        if (this.block.x === column && this.block.y === row) {
          result += this.block.icon;
        } else {
          result += ".";
        }
      }
      result += "\n";
    }    
    return result;
  }
}
