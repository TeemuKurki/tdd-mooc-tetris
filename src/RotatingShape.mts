export class RotatingShape {
  rows: string[];
  constructor(rows: string[]) {
    this.rows = rows;
  }
  static fromString(input: string) {
    return new RotatingShape(input.split("\n").map(row => row.trim()));
  }

  toString() {
    return this.rows.join("\n") + "\n";
  }
}

