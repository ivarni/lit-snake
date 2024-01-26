import { customElement, property } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { START_TICK_RATE, TICK_DECAY } from "../config.ts";
import { Snake } from "../entities/Snake.ts";
import { Apples } from "../entities/Apples.ts";

@customElement("snek-field")
export class SnekField extends LitElement {
  private tickRate = START_TICK_RATE;

  private timeoutId = 0;

  @property()
  private gameOver = false;

  @property()
  private snake: Snake = new Snake();

  @property()
  private apples: Apples = new Apples();

  onTick() {
    const { eaten, nextApples } = this.apples.act(this.snake);
    this.apples = nextApples;

    if (eaten) {
      console.log("yum");
      this.snake = this.snake.growTail();
      this.tickRate = TICK_DECAY(this.tickRate);
    }

    if (this.snake.outOfBounds() || this.snake.hasCollision()) {
      console.log("ouch");
      this.stopGame();
      return;
    }
    this.snake = this.snake.act();

    this.timeoutId = setTimeout(this.onTick.bind(this), this.tickRate);
  }

  private _keyHandler(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        this.snake = this.snake.changeDirection("down");
        break;
      case "ArrowUp":
        this.snake = this.snake.changeDirection("up");
        break;
      case "ArrowRight":
        this.snake = this.snake.changeDirection("right");
        break;
      case "ArrowLeft":
        this.snake = this.snake.changeDirection("left");
        break;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.timeoutId = setTimeout(this.onTick.bind(this), this.tickRate);
    document.addEventListener("keydown", this._keyHandler.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.timeoutId);
    document.removeEventListener("keydown", this._keyHandler);
  }

  private stopGame() {
    this.gameOver = true;
    clearTimeout(this.timeoutId);
  }

  render() {
    return html`
      <div class="wrapper">
        <snek-score
          score=${this.apples.apples.filter((a) => a.eaten).length * 1000}
        ></snek-score>
        <div class="field">
          ${this.apples.apples.map(
            (apple) => html`<snek-yum .apple=${apple}></snek-yum>`,
          )}
          <snek-parts
            .snek=${this.snake}
            .tickRate=${this.tickRate}
            .gameOver=${this.gameOver}
          ></snek-parts>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      width: min(80vw, 80vh);
      height: min(80vw, 80vh);
    }

    .wrapper {
      width: 100%;
      height: 100%;
    }

    .field {
      position: relative;
      display: grid;
      width: 100%;
      height: 100%;
      grid-template-columns: repeat(50, 1fr);
      grid-template-rows: repeat(50, 1fr);
      border: 1px solid var(--game-field-color);
    }
  `;
}
