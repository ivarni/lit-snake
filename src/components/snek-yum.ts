import { customElement, property } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";
import { Apple } from "../entities/Apple.ts";

@customElement("snek-yum")
export class SnekYum extends LitElement {
  @property()
  apple: Apple = new Apple(1, 1);

  render() {
    return html`<div
      class=${classMap({ yum: true, eaten: this.apple.eaten })}
      style=${styleMap({
        right: `${100 - 2 * this.apple.x}%`,
        top: `${2 * (this.apple.y - 1)}%`,
      })}
    ></div>`;
  }

  static styles = css`
    @keyframes appear {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      30% {
        opacity: 1;
        transform: scale(1.4);
      }
      50% {
        transform: scale(0.8);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes disappear {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      25% {
        opacity: 0.6;
        transform: scale(1.4);
      }
      50% {
        opacity: 1;
        transform: scale(1);
      }
      75% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(0);
      }
    }

    .yum {
      animation: appear 2s forwards;
      position: absolute;
      width: 2%;
      height: 2%;
      border-radius: 50%;
      background: linear-gradient(
        10deg,
        var(--apple-color),
        var(--apple-color-2)
      );
      will-change: transform, opacity;
    }

    .yum.eaten {
      animation: disappear 0.7s forwards;
    }
  `;
}
