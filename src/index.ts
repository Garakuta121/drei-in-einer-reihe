import { HTMLController } from "./HTMLController";
import { GameController } from "./GameController";

window.addEventListener("load", (event) => {

  let playerNames = ["Kreuz", "Kreis"]
  let htmlController = new HTMLController();

  htmlController.createPlayerSelect(playerNames, startGame);

  function startGame(player1: string): void {
    let newGame = new GameController(player1, playerNames , htmlController);
    htmlController.createGameBoard(newGame);
  }
});