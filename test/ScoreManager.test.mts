import { describe, expect, it, vi } from "vitest";
import { ScoreManager } from "../src/ScoreManager.js";
import { Board } from "../src/Board.mjs";

describe("ScoreManager tests", () => {
  it("Should add 40 for 1 line", () => {
    const score = new ScoreManager("test-score");
    score.addScore(1);
    expect(score.getScore()).toEqual(40);
  });
  it("Should add 100 for 2 line", () => {
    const score = new ScoreManager("test-score");
    score.addScore(2);
    expect(score.getScore()).toEqual(100);
  });
  it("Should add 300 for 3 line", () => {
    const score = new ScoreManager("test-score");
    score.addScore(3);
    expect(score.getScore()).toEqual(300);
  });
  it("Should add 1200 for 4 line", () => {
    const score = new ScoreManager("test-score");
    score.addScore(4);
    expect(score.getScore()).toEqual(1200);
  });
  it("Should add 0 for 0 line", () => {
    const score = new ScoreManager("test-score");
    score.addScore(0);
    expect(score.getScore()).toEqual(0);
  });
  it("Should call observer when score is updated", () => {
    const score = new ScoreManager("test-score");
    const cbSpy = vi.spyOn(score, "notifyObservers");
    score.addScore(1);
    expect(cbSpy).toBeCalledWith(40);
    score.addScore(2);
    expect(cbSpy).toBeCalledWith(100);
    score.addScore(3);
    expect(cbSpy).toBeCalledWith(300);
    score.addScore(4);
    expect(cbSpy).toBeCalledWith(1200);
  });
  it("Should be able to have multilpe observer", () => {
    const board = new Board(6, 6);
    const score = new ScoreManager("test-score");
    const score2 = new ScoreManager("test2-score");
    const noObs = new ScoreManager("no-score");
    const cbSpy = vi.spyOn(score, "notifyObservers");
    const cbSpy2 = vi.spyOn(score2, "notifyObservers");
    const noObsCbSpy = vi.spyOn(noObs, "notifyObservers");
    board.addScoreObserver(score);
    board.addScoreObserver(score2);
    board.clearLine()
    expect(cbSpy).toBeCalled();
    expect(cbSpy2).toBeCalled();
    expect(noObsCbSpy).not.toBeCalled();
  });
});