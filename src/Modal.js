import { MODAL_SHOW_TIME } from "./constants.js";

class Modal {
  #dialogElementDOM;
  #headerElementDOM;
  #onClose = () => {};

  constructor({ domSelector }) {
    this.#dialogElementDOM = document.querySelector(domSelector);
    this.#headerElementDOM = this.#dialogElementDOM.querySelector("h1");

    this.#preventModalCloseKey();
  }

  open(message) {
    this.#headerElementDOM.textContent = message;
    this.#dialogElementDOM.showModal();

    setTimeout(() => {
      this.#onClose();
      this.close();
    }, MODAL_SHOW_TIME);
  }

  onClose(callback) {
    this.#onClose = callback ?? (() => {});
    return this;
  }

  close() {
    this.#dialogElementDOM.close();
  }

  #preventModalCloseKey() {
    this.#dialogElementDOM.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
      }
    });
  }
}

const modal = new Modal({ domSelector: "#modal" });
export default modal;
