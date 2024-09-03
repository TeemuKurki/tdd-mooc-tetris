export class Board {
  width: number;
  height: number;
  block: {x: number, y: number, icon: string};
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.block = {x: 0, y: 0, icon: "."};
  }

  drop(icon: string) {
    throw new Error("Not implemented");
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
