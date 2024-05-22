
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
    rotate(direction) {
        const rotatedShape = createEmptyShape(this.shape);
        for (let y = 0; y < this.shape.length; y++) {
            const row = this.shape[y]
            for (let x = 0; x < row.length; x++) {
                const dir = direction === "right" ? [x,row.length - 1 - y] : [row.length - 1 - x, y]  
                rotatedShape[dir[0]][dir[1]] = this.shape[y][x]
            }
            
        }
        return new Shape(rotatedShape.map(row => row.join("")))
    }

    rotateRight(){
        return this.rotate("right")
    }

    rotateLeft(){
        return this.rotate("left")
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
