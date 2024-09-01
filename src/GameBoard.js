import {
  MAX_CELLS_TO_TIE,
  MAX_GAME_BOARD_CELLS,
  Value,
  WIN_COMBINATIONS,
} from "./constants.js";
import Tile from "./Tile.js";

export default class GameBoard {
  #elementDOM;
  #tiles = [];

  constructor({ divSelector, onTileClick }) {
    this.#elementDOM = document.querySelector(divSelector);
    this.#initialiseGameBoard(onTileClick);
  }

  get tiles() {
    return this.#tiles;
  }

  clearBoard() {
    this.#tiles.forEach((tile) => tile.clear());
  }

  hasEmptyCells() {
    return this.#tiles.some((tile) => tile.isEmpty());
  }

  /** if there are more than 3 empty tiles, the game CAN be won */
  canBeWon() {
    return this.getEmptyTiles().length > MAX_CELLS_TO_TIE;
  }

  willEndInTie(isXTurn) {
    const emptyTiles = this.getEmptyTiles();

    if (this.hasWinner()) return false;

    if (!this.hasEmptyCells()) return true;

    return emptyTiles.every((tile) => {
      if (!tile.isEmpty()) return true;

      tile.value = isXTurn ? Value.X : Value.O;
      const outcome = this.willEndInTie(emptyTiles, !isXTurn);
      tile.clear();

      return outcome;
    });
  }

  getEmptyTiles() {
    return this.#tiles.filter((tile) => tile.isEmpty());
  }

  hasWinner() {
    return WIN_COMBINATIONS.some((combination) => {
      const value = this.#tiles[combination[0]].value;
      if (value === Value.EMPTY) return false;
      return combination.every(
        (position) => this.#tiles[position].value === value
      );
    });
  }

  #initialiseGameBoard(onTileClick) {
    for (let index = 0; index < MAX_GAME_BOARD_CELLS; index++) {
      const tile = new Tile(onTileClick);
      this.#tiles.push(tile);
      this.#elementDOM.appendChild(tile.elementDOM);
    }
    Object.freeze(this.#tiles);
  }
}
