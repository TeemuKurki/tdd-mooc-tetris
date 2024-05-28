
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
        for (let col = 0; col < this.shape[0].length; col++) {
            const row = this.shape[col]
            for (let cell = 0; cell < row.length; cell++) {
                const dir = direction === "right" ? [cell,row.length - 1 - col] : [row.length - 1 - cell, col]  
                rotatedShape[dir[0]][dir[1]] = this.shape[col][cell]
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
