export class SuffleBag {
  items: number[];
  index: number;
  constructor(items: number[]) {
    this.items = items;
    this.shuffle();
    this.index = 0;
  }

  shuffle(): void {
    for (let i = this.items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
  }

  draw(): number {
    if (this.index >= this.items.length) {
      this.shuffle();
      this.index = 0;
    }
    return this.items[this.index++];
  }
}
