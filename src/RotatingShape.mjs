
const createEmptyShape = (shape) => {
    const newArray = new Array(shape.length)
    for (let y = 0; y < shape.length; y++) {
        const row = shape[y]
        newArray[y] = new Array(row.length)
    }
    return newArray;
}

class Shape {
    shape;
    constructor(shape){
        this.shape = shape
    }
    rotateRight() {
        const rotatedShape = createEmptyShape(this.shape);
        for (let y = 0; y < this.shape.length; y++) {
            const row = this.shape[y]
            for (let x = 0; x < row.length; x++) {
                rotatedShape[x][row.length - 1 - y] = this.shape[y][x]
            }
            
        }
        return new Shape(rotatedShape.map(row => row.join("")))
    }
    rotateLeft(){
        return this.rotateRight().rotateRight().rotateRight()
    }

    toString() {
        return this.shape.flat().join("\n") + "\n"
    }
}

export const RotatingShape = {
    fromString(str){
        const shapeStr = str.replaceAll(" ", "").trim()
        const shape = shapeStr.split("\n");
        return new Shape(shape)
    }
    
}