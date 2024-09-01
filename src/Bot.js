import {
  BOT_DELAY_MS,
  MinimaxEvaluationScores,
  Value,
  WIN_COMBINATIONS,
} from "./constants.js";
import Player from "./Player.js";

export default class Bot extends Player {
  constructor(symbol) {
    super(symbol);
  }

  makeMove(gameBoard) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const optimalTileIndex = this.calculateOptimalTileIndex(gameBoard);
        if (optimalTileIndex !== -1) {
          gameBoard.tiles[optimalTileIndex].value = this.symbol;
        }
        resolve();
      }, BOT_DELAY_MS);
    });
  }

  calculateOptimalTileIndex(gameBoard) {
    let optimalTileIndex = -1;
    let bestScore = Number.MIN_SAFE_INTEGER;

    gameBoard.tiles.forEach((tile, index) => {
      if (!tile.isEmpty()) return;

      tile.value = this.symbol;
      const score = this.#minimax(gameBoard, 0, false);
      tile.clear();

      if (score > bestScore) {
        bestScore = score;
        optimalTileIndex = index;
      }
    });
    return optimalTileIndex;
  }

  #calculateBoardScore({ tiles }) {
    const winningCombination = WIN_COMBINATIONS.find((combination) =>
      this.#isWinningCombination(tiles, combination)
    );

    if (!winningCombination) {
      return MinimaxEvaluationScores.TIE;
    }

    const winner = winningCombination.map(
      (position) => tiles[position].value
    )[0];
    return winner === this.symbol
      ? MinimaxEvaluationScores.WIN
      : MinimaxEvaluationScores.LOSS;
  }

  #isWinningCombination(tiles, combination) {
    return combination.every(
      (position) =>
        tiles[position].value === tiles[combination[0]].value &&
        tiles[position].value !== Value.EMPTY
    );
  }

  #minimax(gameBoard, depth, isMaximizing) {
    const score = this.#calculateBoardScore(gameBoard);

    if (score === MinimaxEvaluationScores.WIN) {
      return score - depth;
    }

    if (score === MinimaxEvaluationScores.LOSS) {
      return score + depth;
    }

    if (!gameBoard.hasEmptyCells()) {
      return MinimaxEvaluationScores.TIE;
    }

    let bestScore = isMaximizing
      ? Number.MIN_SAFE_INTEGER
      : Number.MAX_SAFE_INTEGER;

    gameBoard.tiles.forEach((tile) => {
      if (!tile.isEmpty()) return;

      const computeBestScore = isMaximizing ? Math.max : Math.min;
      const opponentSymbol = this.symbol === Value.X ? Value.O : Value.X;

      tile.value = isMaximizing ? this.symbol : opponentSymbol;
      const currScore = this.#minimax(gameBoard, depth + 1, !isMaximizing);
      bestScore = computeBestScore(bestScore, currScore);
      tile.clear();
    });

    return bestScore;
  }
}
