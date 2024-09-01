import Bot from "./Bot.js";
import { GAME_MODE, Value } from "./constants.js";
import GameBoard from "./GameBoard.js";
import modal from "./Modal.js";
import Player from "./Player.js";

export default class Engine {
  currentPlayer;
  initialStartingPlayer;
  isGameOver = false;
  botIsProcessing = false;
  gameMode;

  constructor() {
    this.gameBoard = new GameBoard({
      divSelector: "#game-board",
      onTileClick: this.handleTileClick.bind(this),
    });

    this.indicatorX = document.querySelector("#x-symbol");
    this.indicatorO = document.querySelector("#o-symbol");
  }

  setupGame(gameMode) {
    this.gameMode = gameMode;

    this.player1 = new Player(Value.X);
    this.player2 =
      gameMode === GAME_MODE.TWO_PLAYERS
        ? new Player(Value.O)
        : new Bot(Value.O);
  }

  handleTileClick(tile) {
    if (!tile.isEmpty() || this.botIsProcessing) return;
    this.makeCurrentPlayerMove(tile);
  }

  async makeCurrentPlayerMove(arg) {
    if (this.isGameOver) return;

    await this.currentPlayer.makeMove(arg);
    if (this.isBotTurn()) {
      this.botIsProcessing = false;
    }

    this.evaluateGameState();
    if (!this.isGameOver) {
      this.toggleCurrentPlayer();
      this.triggerNextMove();
    }
  }

  isBotTurn() {
    return this.currentPlayer instanceof Bot;
  }

  evaluateGameState() {
    this.isGameOver = this.shouldTerminate();
    if (!this.isGameOver) return;

    this.handleGameOver();
  }

  handleGameOver() {
    this.togglePlayerIndicators();
    if (this.gameBoard.hasWinner()) {
      this.currentPlayer.incrementScore();
    }

    this.showGameOverModal();
    this.toggleCurrentPlayer();
  }

  showGameOverModal() {
    const message = this.gameBoard.hasWinner()
      ? `${this.currentPlayer.symbol} wins!`
      : "Cat's game!";
    modal.onClose(this.startGame.bind(this)).open(message);
  }

  shouldTerminate() {
    if (this.gameBoard.hasWinner() || !this.gameBoard.hasEmptyCells())
      return true;

    if (this.gameBoard.canBeWon()) return false;

    const isP1Curr = this.togglePlayer(this.currentPlayer) === this.player1;
    return this.gameBoard.willEndInTie(isP1Curr);
  }

  triggerNextMove() {
    if (this.isBotTurn()) {
      this.botIsProcessing = true;
      this.makeCurrentPlayerMove(this.gameBoard);
    }
  }

  togglePlayer(player) {
    return player === this.player1 ? this.player2 : this.player1;
  }

  toggleCurrentPlayer() {
    const player = this.togglePlayer(this.currentPlayer);
    this.setCurrentPlayer(player);
  }

  toggleStartingPlayer() {
    const player = this.togglePlayer(this.initialStartingPlayer);
    this.setStartingPlayer(player);
  }

  setStartingPlayer(player) {
    this.initialStartingPlayer = player;
    this.setCurrentPlayer(this.initialStartingPlayer);
  }

  setCurrentPlayer(player) {
    this.currentPlayer = player;
    this.togglePlayerIndicators();
  }

  togglePlayerIndicators() {
    this.indicatorX.classList.toggle(
      "active",
      this.currentPlayer.symbol === Value.X
    );
    this.indicatorO.classList.toggle(
      "active",
      this.currentPlayer.symbol === Value.O
    );
  }

  startGame() {
    if (!this.initialStartingPlayer) {
      this.setStartingPlayer(this.player1);
    } else {
      this.toggleStartingPlayer();
    }

    this.gameBoard.clearBoard();
    this.isGameOver = false;

    this.triggerNextMove();
  }

  resetGame() {
    this.player1 = this.player2 = undefined;
    this.gameMode = undefined;
  }
}
