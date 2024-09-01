import { Value } from "./constants.js";

export default class Player {
  #score = 0;
  #scoreElementDOM;
  
  constructor(symbol) {
    this.symbol = symbol;
    this.#initScoreElement();
  }

  get score() {
    return this.#score;
  }

  makeMove(tile) {
    tile.value = this.symbol;
  }

  incrementScore() {
    this.#setScore(this.#score + 1);
  }

  resetScore() {
    this.#setScore(0);
  }

  #initScoreElement() {
    const selector = this.symbol === Value.X ? "#x-score" : "#o-score";
    this.#scoreElementDOM = document.querySelector(selector);
    this.#scoreElementDOM.textContent = this.#score;
  }

  #setScore(score) {
    this.#score = score;
    this.#scoreElementDOM.textContent = score;
  }
}
