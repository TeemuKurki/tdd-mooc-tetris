export class RotatingShape {
  rows: string[];
  constructor(rows: string[]) {
    this.rows = rows;
  }
  static fromString(input: string) {
    return new RotatingShape(input.split("\n").map(row => row.trim()));
  }

  rotateRight() { 
    const rotated = this.rows.map((_, shapeRowIndex) => {
      const columns = this.rows.map(row => row[shapeRowIndex])
      return columns.reverse().join("")
    });
    return new RotatingShape(rotated);
  }

  rotateLeft() {
    return this.rotateRight().rotateRight().rotateRight();
  }

  toString() {
    return this.rows.join("\n") + "\n";
  }
}

