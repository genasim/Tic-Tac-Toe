export const Value = Object.freeze({
  EMPTY: "",
  X: "x",
  O: "o",
});

export const MAX_PLAYERS = 2;

export const MAX_GAME_BOARD_CELLS = 9;

const rows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];
const columns = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
const diagonals = [
  [0, 4, 8],
  [2, 4, 6],
];

export const WIN_COMBINATIONS = [...rows, ...columns, ...diagonals];

export const MODAL_SHOW_TIME = 3000;

export const MAX_CELLS_TO_TIE = 3;

export const MinimaxEvaluationScores = Object.freeze({
  WIN: 10,
  TIE: 0,
  LOSS: -10,
});

export const BOT_DELAY_MS = 500;

export const GAME_MODE = Object.freeze({
  TWO_PLAYERS: "two-players",
  PLAYER_VS_BOT: "player-vs-bot",
});

export const DISPLAY = Object.freeze({
  FLEX: "flex",
  NONE: "none",
});