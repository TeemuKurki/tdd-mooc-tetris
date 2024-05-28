
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

    get #dimensions(){
        return {
            width: this.shape[0].length,
            height: this.shape.length
        }
    }

    rotate(direction) {
        const rotatedShape = createEmptyShape(this.shape);
        for (let row_index = 0; row_index < this.#dimensions.height; row_index++) {
            const row = this.shape[row_index]
            for (let col_index = 0; col_index < row.length; col_index++) {
                const [new_row, new_col] = direction === "right" ? [col_index,row.length - 1 - row_index] : [row.length - 1 - col_index, row_index]  
                rotatedShape[new_row][new_col] = this.shape[row_index][col_index]
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
