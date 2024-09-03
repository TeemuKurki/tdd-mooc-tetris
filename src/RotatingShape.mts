export class RotatingShape {
  rows: string[];
  orientations: number;
  orientation: number;
  constructor(rows: string[], orientations = 4, orientation = 0) {
    this.rows = rows;
    this.orientations = orientations;
    this.orientation = orientation
  }
  static fromString(input: string) {
    return new RotatingShape(input.split("\n").map(row => row.trim()));
  }

  rotateRight() { 
    const rotated = this.rows.map((_, shapeRowIndex) => {
      const columns = this.rows.map(row => row[shapeRowIndex])
      return columns.reverse().join("")
    });
    return new RotatingShape(rotated, this.orientations, (this.orientation + 1) % 4);
  }

  rotateLeft() {
    if(this.orientations === 4) {
      return this.rotateRight().rotateRight().rotateRight();
    }
    if(this.orientations === 2) {
      if(this.orientation === this.orientations - 1){
        return this.rotateRight().rotateRight().rotateRight();
      }else {
        return this.rotateRight()

      }
    }
    return this;
  }

  toString() {
    return this.rows.join("\n") + "\n";
  }
}

