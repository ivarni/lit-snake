import { Direction } from "./index.ts";

export class SnakeBody {
  private _x: number;
  private _y: number;

  constructor(coords: { x: number; y: number }) {
    this._x = coords.x;
    this._y = coords.y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  static nextHead(x: number, y: number, direction: Direction) {
    switch (direction) {
      case "right":
        return new SnakeBody({ x: x + 1, y });
      case "left":
        return new SnakeBody({ x: x - 1, y });
      case "up":
        return new SnakeBody({ x, y: y - 1 });
      case "down":
        return new SnakeBody({ x, y: y + 1 });
    }
  }

  static newTail(x: number, y: number, direction: Direction) {
    switch (direction) {
      case "right":
        return new SnakeBody({ x: x - 1, y });
      case "left":
        return new SnakeBody({ x: x + 1, y });
      case "up":
        return new SnakeBody({ x, y: y + 1 });
      case "down":
        return new SnakeBody({ x, y: y - 1 });
    }
  }
}
