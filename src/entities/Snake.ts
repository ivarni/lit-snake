import { SnakeBody } from "./SnakeBody.ts";
import { Direction } from "./index.ts";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../config.ts";
import { Apple } from "./Apple.ts";

export class Snake {
  private _sneks: SnakeBody[];
  private _direction: Direction;

  constructor(sneks?: SnakeBody[], direction?: Direction) {
    this._sneks = sneks || [
      new SnakeBody({ x: 5, y: 3 }),
      new SnakeBody({ x: 4, y: 3 }),
      new SnakeBody({ x: 3, y: 3 }),
    ];
    this._direction = direction || "right";
  }

  get sneks() {
    return this._sneks;
  }

  get direction() {
    return this._direction;
  }

  head() {
    return this._sneks[0];
  }

  tail() {
    return this._sneks[this._sneks.length - 1];
  }

  changeDirection(newDirection: Direction) {
    return new Snake(this.sneks, newDirection);
  }

  growTail() {
    const nextTail = SnakeBody.newTail(
      this.tail().x,
      this.tail().y,
      this._direction,
    );
    return new Snake([...this._sneks, nextTail], this._direction);
  }

  act() {
    const nextHead = SnakeBody.nextHead(
      this.head().x,
      this.head().y,
      this._direction,
    );
    const nextSneks = [nextHead, ...this._sneks];
    nextSneks.pop();
    return new Snake(nextSneks, this._direction);
  }

  hasCollision() {
    const seen: { x: number; y: number }[] = [];
    for (let snek of this._sneks) {
      if (seen.find((s) => s.x === snek.x && s.y === snek.y)) {
        return true;
      }
      seen.push(snek);
    }
    return false;
  }

  outOfBounds() {
    return (
      (this.head().x === 0 && this._direction === "left") ||
      (this.head().x === BOARD_WIDTH + 1 && this._direction === "right") ||
      (this.head().y === 0 && this._direction === "up") ||
      (this.head().y === BOARD_HEIGHT + 1 && this._direction === "down")
    );
  }

  foundApple(apples: Apple[]) {
    return apples.find(
      (a) => !a.eaten && this.head().x === a.x && this.head().y === a.y,
    );
  }
}
