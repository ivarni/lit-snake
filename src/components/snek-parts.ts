import { customElement, property } from "lit/decorators.js";
import { html, LitElement } from "lit";
import { Snake } from "../entities/Snake.ts";

@customElement("snek-parts")
export class SnakeParts extends LitElement {
  @property()
  snek: Snake = new Snake();

  @property({ type: Number })
  tickRate: number = 0;

  @property({ type: Boolean })
  gameOver: boolean = false;

  render() {
    return html` ${this.snek.sneks.map(
      (snek, index) =>
        html`<snek-body
          .x=${snek.x}
          .y=${snek.y}
          .head=${index === 0}
          .tick=${this.tickRate}
          .direction=${this.snek.direction}
          .dead=${this.gameOver}
          .snekId=${index}
        ></snek-body>`,
    )}`;
  }
}
