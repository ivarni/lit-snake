import { customElement, property } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";

@customElement("snek-score")
export class SnekScore extends LitElement {
  @property({ type: Number })
  score = 0;

  @property({ type: Number })
  private _hideAnimation = false;

  private _timeoutId = 0;

  animationEnd() {
    this._hideAnimation = true;
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null,
  ) {
    super.attributeChangedCallback(name, _old, value);
    this._hideAnimation = true;
    this._timeoutId = setTimeout(() => (this._hideAnimation = false), 150);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._timeoutId);
  }

  render() {
    return html`<div class="wrapper">
      <div class="placeholder">SCORE:</div>
      <div
        class=${classMap({
          score: true,
          animated: !this._hideAnimation,
        })}
        @animationend=${this.animationEnd}
      >
        ${this.score}
      </div>
    </div>`;
  }

  static styles = css`
    @keyframes update {
      0% {
        transform: scale(1);
        text-shadow: 0 0 32px white;
        color: transparent;
      }

      50% {
        transform: scale(0.87);
      }

      75% {
        transform: scale(1);
      }

      100% {
        text-shadow: 3px 3px 10px black;
        color: black;
      }
    }

    :host {
      font-size: 45px;
      font-family: fantasy;
      text-shadow: 3px 3px 10px black;
    }

    .wrapper {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      overflow: hidden;
    }

    .score {
      min-width: 200px;
      text-align: center;
    }

    .score.animated {
      animation: update 2s forwards;
    }
  `;
}
