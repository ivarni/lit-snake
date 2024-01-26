import { Apple } from "./Apple.ts";
import { Snake } from "./Snake.ts";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../config.ts";

export class Apples {
  private _apples: Apple[];

  constructor(apples?: Apple[]) {
    this._apples = apples || [new Apple(10, 3)];
  }

  get apples() {
    return this._apples;
  }

  act(snake: Snake) {
    const eatenApple = snake.foundApple(this._apples);

    let nextApples = this._apples;
    if (eatenApple) {
      nextApples = this.apples
        .map((a) => {
          if (a.x === eatenApple.x && a.y === eatenApple.y) {
            return a.consume();
          }
          return a;
        })
        .concat(
          new Apple(
            Math.ceil(Math.random() * BOARD_WIDTH),
            Math.ceil(Math.random() * BOARD_HEIGHT),
          ),
        );

      while (nextApples.length < 4) {
        nextApples.push(
          new Apple(
            Math.ceil(Math.random() * BOARD_WIDTH),
            Math.ceil(Math.random() * BOARD_HEIGHT),
          ),
        );
      }
    }
    return {
      eaten: !!eatenApple,
      nextApples: new Apples(nextApples),
    };
  }
}
