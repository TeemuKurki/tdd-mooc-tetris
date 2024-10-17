export class RotatingShape {
  rows: string[];
  orientations: number;
  orientation: number;
  constructor(rows: string[], orientations = 4, orientation = 0) {
    this.rows = rows;
    this.orientations = orientations;
    this.orientation = orientation;
  }
  static fromString(input: string) {
    return new RotatingShape(input.split("\n").map((row) => row.trim()));
  }

  rotateRight(bypass?: boolean): RotatingShape {
    const orientation = (this.orientation + 1) % this.orientations;
    if (orientation === 0 && !bypass) return this.rotateLeft(true);
    const rotated = this.rows.map((_, shapeRowIndex) => {
      const columns = this.rows.map((row) => row[shapeRowIndex]);
      return columns.reverse().join("");
    });
    return new RotatingShape(rotated, this.orientations, orientation);
  }

  rotateLeft(bypass?: boolean): RotatingShape {
    if (this.orientations === 4) {
      return this.rotateRight(bypass).rotateRight(bypass).rotateRight(bypass);
    }
    if (this.orientations === 2) {
      if (this.orientation === this.orientations - 1) {
        return this.rotateRight(bypass).rotateRight(bypass).rotateRight(bypass);
      } else {
        return this.rotateRight(bypass);
      }
    }
    return this;
  }

  toString() {
    return this.rows.join("\n") + "\n";
  }
  toBlock() {
    return this.rows.map((row) => row.split(""))
  }
  get height(){
    return this.rows.length;
  }
  get width(){
    return this.rows[0].length;
  }
}
