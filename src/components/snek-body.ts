import { customElement, property } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { Snake } from "../entities/Snake.ts";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../config.ts";

@customElement("snek-body")
export class SnekBody extends LitElement {
  @property({ type: Number })
  x = 1;

  @property({ type: Number })
  y = 1;

  @property({ type: Number })
  tick = 0;

  @property({ type: Boolean })
  head = false;

  @property({ type: Boolean })
  dead = false;

  @property({ type: String })
  direction: "left" | "right" | "up" | "down" = "right";

  @property({ type: Number })
  snekId = 0;

  @property()
  snek: Snake = new Snake();

  render() {
    return html`<div
      class=${classMap({
        snek: true,
        dead: this.dead,
      })}
      style=${styleMap({
        right: `${100 - (100 / BOARD_WIDTH) * this.x}%`,
        top: `${(100 / BOARD_HEIGHT) * (this.y - 1)}%`,
        "transition-duration": `${this.dead ? 1.2 : this.tick / 1000}s`,
        "animation-delay": `${this.snekId * 75}ms`,
        "z-index": BOARD_WIDTH * BOARD_HEIGHT - this.snekId,
      })}
    >
      ${this.head
        ? html`<div
            class="head"
            style=${styleMap({
              "transition-duration": `${this.dead ? 1.2 : this.tick / 1000}s`,
              transform: (() => {
                switch (this.direction) {
                  case "right":
                    return "rotate(90deg)";
                    break;
                  case "left":
                    return "rotate(270deg)";
                    break;
                  case "up":
                    return "rotate(0deg)";
                    break;
                  case "down":
                    return "rotate(180deg)";
                    break;
                }
              })(),
            })}
          >
            <div class="eye"></div>
            <div class="eye"></div>
          </div>`
        : ""}
    </div>`;
  }

  static styles = css`
    @keyframes die {
      0% {
        transform: scale(1);
      }
      10% {
        transform: scale(1.2);
      }
      20% {
        transform: scale(0.8);
      }
      30% {
        transform: scale(1.2);
      }
      40% {
        transform: scale(0.8);
      }
      90% {
        transform: scale(1.5);
        opacity: 1;
      }
      100% {
        transform: scale(0);
        opacity: 0;
      }
    }

    @keyframes roll {
      25% {
        transform: rotate(90deg);
      }
      50% {
        transform: rotate(180deg);
      }
      75% {
        transform: rotate(270deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }

    .snek {
      position: absolute;
      width: 2%;
      height: 2%;
      border-radius: 50%;
      background: linear-gradient(
        45deg,
        var(--snek-color),
        var(--snek-color-2)
      );
      will-change: top, right, scale;
      transition-property: top, right, scale;
      transition-timing-function: linear;
    }

    .dead {
      animation: die 3s forwards;
    }

    .dead .head {
      animation: roll 3s forwards;
    }

    .head {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-top: 4px;
      transform-origin: bottom;
      will-change: transform;
      transition: transform;
      transition-timing-function: ease;
    }

    .eye {
      background-color: var(--apple-color);
      border-radius: 50%;
      width: 4px;
      height: 4px;
      margin: 0 2px;
    }
  `;
}
