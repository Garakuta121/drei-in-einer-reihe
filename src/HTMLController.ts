import { GameController } from "./GameController";

export class HTMLController {

  #infoText = document.getElementById("infoText") as HTMLElement;

  readonly createPlayerSelect = (playerNames: string[], startGame: (playerName: string) => void): void => {
    
    let playerSelectHTML = document.getElementById("playerSelect") as HTMLElement;
    for (let playerName of playerNames) {
    
      let newTile = document.createElement("button");
      newTile.className = "selectTile";
      newTile.innerHTML = `<img class="${playerName}">`;
      newTile.onclick = () => {
        playerSelectHTML.remove();
        startGame(playerName);
      };

      playerSelectHTML.appendChild(newTile);
    }
  }

  readonly createGameBoard = (gameController: GameController): void => {

    let gameBoard = document.getElementById("gameBoard") as HTMLElement;

    for (let col = 1; col <= 4; col++) {
      for (let row = 1; row <= 4; row++) {
        let newTile = createTile(gameController, row, col);
        gameBoard.appendChild(newTile);
      }
    }

    function createTile(gameController: GameController, row: number, col: number): HTMLButtonElement {

      let newTile = document.createElement("button");

      newTile.className = "gameTile";
      newTile.onclick = (event): void => {
        let tile = event.target as HTMLButtonElement;
        tile.disabled = true;

        let symbol = document.createElement("img");
        symbol.className = gameController.getCurrentPlayer();
        tile.appendChild(symbol);

        gameController.checkPlayerMove([row, col]);
      };

      return newTile;
    }
  }

  readonly updateCurrentPlayer = (currentPlayer: string): void => {
    this.#infoText.innerHTML = `<p>${currentPlayer} ist dran!</p>`;
  }

  readonly endGame = (result: string, player1: string, player2: string): void => {

    let buttons = document.getElementsByClassName("gameTile") as HTMLCollectionOf<HTMLButtonElement>;
    for (let button of buttons) {
      button.disabled = true;
    }

    let resultHTML = document.createElement("p");
    resultHTML.innerHTML =
      result == player1 || result == player2
        ? result + " hat verloren!"
        : "Unentschieden!";
    resultHTML.innerHTML += "<br><br> Lade die Seite neu, um erneut zu spielen!";

    this.#infoText.innerHTML = "";
    this.#infoText.appendChild(resultHTML);
  }
}
