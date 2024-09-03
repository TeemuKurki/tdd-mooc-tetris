export class RotatingShape {
  rows: string[];
  orientation: number;
  constructor(rows: string[], orientation = 0) {
    this.rows = rows;
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
    return new RotatingShape(rotated, (this.orientation + 1) % 4);
  }

  rotateLeft() {
    return this.rotateRight().rotateRight().rotateRight();
  }

  toString() {
    return this.rows.join("\n") + "\n";
  }
}

