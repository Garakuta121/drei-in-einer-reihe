import { HTMLController } from "./HTMLController";

export class GameController {

  #player1: string;
  #player2: string;
  #nmbOfTurns = 1;
  #playerTiles: { [key: string]: Array<[number, number]> };
  #htmlController: HTMLController;

  constructor(player1: string, playerNames: string[], htmlController: HTMLController) {

    let player2 = player1 == playerNames[0] ? playerNames[1] : playerNames[0];
    this.#player1 = player1;
    this.#player2 = player2;

    //specihert die von den jeweiligen Spieler belegten Felder als Koordinate ab (z.B. [1,1] für das Feld ganz oben-links)
    this.#playerTiles = { [player1]: new Array(), [player2]: new Array() };

    this.#htmlController = htmlController;
    this.#htmlController.updateCurrentPlayer(player1);
  }

  readonly getCurrentPlayer = (): string => this.#nmbOfTurns % 2 == 1 ? this.#player1 : this.#player2;

  readonly checkPlayerMove = (currentTile: [number, number]): void => {

    this.#playerTiles[this.getCurrentPlayer()].push(currentTile);

    let gameState = this.#checkGameState(currentTile);
    if (gameState.isGameOver) {
      this.#htmlController.endGame(gameState.result, this.#player1, this.#player2);
      return
    }

    this.#nmbOfTurns += 1;
    this.#htmlController.updateCurrentPlayer(this.getCurrentPlayer());
  };

  #checkGameState(currentTile: [number, number]): {isGameOver: boolean, result: string} {

    let nmbOfTurns = this.#nmbOfTurns;
    let playerTiles = this.#playerTiles;
    let currentPlayer = this.getCurrentPlayer();

    // Da die Spieler jede Runde wechseln, ist das frühstmögliche Ende erst in Runde 5 möglich
    if (nmbOfTurns < 5) {
      return { isGameOver: false, result: "" };
    }

    /*
    Die Verlier-Bedingung, dass 3 nebeneinanderliegende Felder vom selben Spieler belegt werden,
    wird dadurch überprüft, dass zunächst alle Felder um das zuletzt belegte Feld überprüft werden
    (also, dass 2 Felder eines Spielers nebeneinander stehen). Danach wird geschaut, ob ein drittes
    Feld ebenfalls in der Reihe liegt.
    Dieser Ansatz wurde gewählt (im Gegensatz zu Hardcode-Alternativen), da so die Methode simpel
    für ein nXn-Feld erweitert werden kann.
    */
    let someoneLost = getNeighborTiles(currentTile).some((neighborTile) => {
      if (isTileInCurrentPlayersTiles(neighborTile)) {
        return checkIf3InARow(currentTile, neighborTile)
      }
    });

    if (someoneLost) {
      return { isGameOver: true, result: currentPlayer };
    } else if (nmbOfTurns == 16) {
      return { isGameOver: true, result: "" };
    } else {
      return { isGameOver: false, result: "" };
    }

    function getNeighborTiles(tile: [number, number]): Array<[number, number]> {

      let neighborTiles: Array<[number, number]> = new Array();

      for (let colOffset = -1; colOffset <= 1; colOffset++) {
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {

          let ngbhrRow = tile[0] + rowOffset;
          let ngbhrCol = tile[1] + colOffset;

          if (
            ngbhrRow < 0 ||
            ngbhrRow > 4 ||
            ngbhrCol < 0 ||
            ngbhrCol > 4 ||
            (rowOffset == 0 && colOffset == 0)
          ) {
            continue;
          }

          neighborTiles.push([ngbhrRow, ngbhrCol]);
        }
      }
      return neighborTiles;
    }

    function isTileInCurrentPlayersTiles(tile: [number, number]): boolean {
      return playerTiles[currentPlayer].some(
        (playerTile) => JSON.stringify(tile) == JSON.stringify(playerTile)
      );
    }

    /*
    Beispiel:
    currentTile = [2,2], neighborTile = [3,2] => delta = [1,0]
    possible3rdTiles = [[1,2], [4,2]]
    */
    function checkIf3InARow(currentTile: [number, number], neighborTile: [number, number]): boolean {

      let delta: [number, number] = [ neighborTile[0] - currentTile[0],neighborTile[1] - currentTile[1]];

      let possible3rdTiles: Array<[number, number]> = new Array();
      possible3rdTiles.push([currentTile[0] - delta[0], currentTile[1] - delta[1],]);
      possible3rdTiles.push([neighborTile[0] + delta[0], neighborTile[1] + delta[1],]);

      return possible3rdTiles.some((tile) => isTileInCurrentPlayersTiles(tile));
    }

  }
}
