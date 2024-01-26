export type Size = "small" | "medium" | "large";

const randomSize = (): Size => {
  return ["small", "medium", "large"][Math.floor(Math.random() * 3)] as Size;
};

export class Apple {
  private _x: number;
  private _y: number;
  private _size: Size;
  private _eaten: boolean;

  constructor(x: number, y: number, eaten?: boolean) {
    this._x = x;
    this._y = y;
    this._size = randomSize();
    this._eaten = eaten || false;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get size() {
    return this._size;
  }

  get eaten() {
    return this._eaten;
  }

  consume() {
    return new Apple(this._x, this._y, true);
  }
}
