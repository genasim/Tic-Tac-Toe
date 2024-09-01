import { Value } from "./constants.js";

export default class Tile {
  #elementDOM;
  #value = Value.EMPTY;

  constructor(onClick) {
    this.initialiseTile(onClick);
  }

  initialiseTile(onClick) {
    this.#elementDOM = document.createElement("div");
    this.#elementDOM.classList.add("tile");

    this.#elementDOM.addEventListener("click", () => onClick(this));
  }

  get elementDOM() {
    return this.#elementDOM;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    if (!Object.values(Value).includes(value)) return;

    switch (value) {
      case Value.EMPTY:
        this.#elementDOM.classList.remove("symbol-x", "symbol-o");
        break;
      case Value.X:
        this.#elementDOM.classList.add("symbol-x");
        break;
      case Value.O:
        this.#elementDOM.classList.add("symbol-o");
        break;
      default:
        break;
    }

    this.#value = value;
    this.#elementDOM.textContent = value;
  }

  isEmpty() {
    return this.#value === Value.EMPTY;
  }

  clear() {
    this.value = Value.EMPTY;
  }
}
