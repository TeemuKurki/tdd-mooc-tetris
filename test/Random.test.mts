import { describe, it,  expect } from "vitest";
import { Board } from "../src/Board.mjs";

describe("Random tests", () => {
  it("Should return equal distribution of 7 numbers", () => {
    const board = new Board(6, 6);
    const randomNumbers = [];
    for (let index = 0; index < 70; index++) {
      randomNumbers.push(board.suffleBag.draw());
    }
    expect(randomNumbers).toHaveLength(70);
    expect([...new Set(randomNumbers)]).toHaveLength(7);
    expect(randomNumbers.filter((num) => num === 0)).toHaveLength(10);
    expect(randomNumbers.filter((num) => num === 1)).toHaveLength(10);
    expect(randomNumbers.filter((num) => num === 2)).toHaveLength(10);
    expect(randomNumbers.filter((num) => num === 3)).toHaveLength(10);
    expect(randomNumbers.filter((num) => num === 4)).toHaveLength(10);
    expect(randomNumbers.filter((num) => num === 5)).toHaveLength(10);
    expect(randomNumbers.filter((num) => num === 6)).toHaveLength(10);
    expect(true).not.toEqual(null);
  })
  it("Should return numbers in random order", () => {
    const board = new Board(6, 6);
    const randNums = Array(10).fill(0).map(() => board.suffleBag.draw());
    const randNums2 = Array(10).fill(0).map(() => board.suffleBag.draw());
    expect(randNums).not.toEqual(randNums2);
  })
});