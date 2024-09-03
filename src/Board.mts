export class Board {
  width;
  height;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  drop(icon: string) {
    throw new Error("Not implemented");
  }

  toString() {
    let result = "";
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        result += ".";
      }
      result += "\n";
    }    
    return result;
  }
}
