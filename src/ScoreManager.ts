interface Observer {
  update(linesCleared: number): void;
}

export class ScoreManager {
  private observers: Observer[] = [];
  private score: number = 0;
  id: string
  constructor(id: string) {
    this.id = id
  }

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  public notifyObservers(linesCleared: number): void {
    for (const observer of this.observers) {
      observer.update(linesCleared);
    }
  }

  public addScore(linesCleared: number): void {
    const points = this.calculatePoints(linesCleared);
    this.score += points;
    this.notifyObservers(points);
  }

  private calculatePoints(linesCleared: number): number {
    switch (linesCleared) {
      case 1: return 40;
      case 2: return 100;
      case 3: return 300;
      case 4: return 1200;
      default: return 0;
    }
  }

  public getScore(): number {
    return this.score;
  }
}