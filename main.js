import { DISPLAY, GAME_MODE } from "./src/constants.js";
import Engine from "./src/Engine.js";

const gameScreen = document.getElementById("game-screen");
const gameMenu = document.getElementById("game-menu");

gameScreen.style.display = "none";

const toggleGameScreens = () => {
  const isGameScreenVisible = gameScreen.style.display === DISPLAY.FLEX;
  
  gameScreen.style.display = isGameScreenVisible ? DISPLAY.NONE : DISPLAY.FLEX;
  gameMenu.style.display = isGameScreenVisible ? DISPLAY.FLEX : DISPLAY.NONE;
};

const pvpModeBtn = document.getElementById("pvp-mode");
const pvcModeBtn = document.getElementById("pvc-mode");

const engine = new Engine();

pvpModeBtn.addEventListener("click", () => {
  toggleGameScreens();
  engine.setupGame(GAME_MODE.TWO_PLAYERS);
  engine.startGame();
});

pvcModeBtn.addEventListener("click", () => {
  toggleGameScreens();
  engine.setupGame(GAME_MODE.PLAYER_VS_BOT);
  engine.startGame();
});

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  toggleGameScreens();
  engine.resetGame();
});
