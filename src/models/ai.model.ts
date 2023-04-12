import { getAvailableActions, getWinningPlayer, play } from './board.model';
import { negatePlayer, Player } from './player.model';
import { Tile, TileIndex } from './tile.model';
import _ from 'lodash';

export interface AIAction {
  index: TileIndex;
  score: number;
}

/*
  Returns the best possible move (a TileIndex) given an array of tiles and the next player to play.
  This is calculated using the minimax algorithm.
*/
export const getBestMove = (tiles: Tile[], player: Player): TileIndex => {
  const availableActions = getAvailableActions(tiles);
  if (availableActions.length === 9) return 4;

  let bestMove: TileIndex = 0;
  let bestScore: number = -Infinity;

  for (let action of availableActions) {
    const clonedTiles = _.cloneDeep(tiles);
    const moveScore = minimax(clonedTiles, action, player, 1, player);

    if (moveScore > bestScore) {
      bestMove = action;
      bestScore = moveScore;
    }
  }

  return bestMove;
};

/*
  Minimax algorithm maximizes the score of the original player and minimizes the score of the
  opponent player. This is a recursive functions that returns the score of the given action.
*/
export const minimax = (
  tiles: Tile[],
  action: TileIndex,
  player: Player,
  depth: number,
  originalPlayer: Player
): number => {
  const newTiles = play(tiles, player, action);
  let winningPlayer = getWinningPlayer(newTiles);

  // Game is finished because winningPlayer is the player who just played
  if (winningPlayer === player) {
    return winningPlayer === originalPlayer ? 10000 / depth : -10000 / depth;
  }

  // Game tied
  if (winningPlayer === 'tie') {
    return 0;
  }

  // Game is not finished
  const availableActions = getAvailableActions(newTiles);

  // We maximize
  if (originalPlayer !== player) {
    let bestScore: number = -Infinity;

    for (let action of availableActions) {
      const clonedTiles = _.cloneDeep(newTiles);
      const moveScore = minimax(
        clonedTiles,
        action,
        originalPlayer,
        depth + 1,
        originalPlayer
      );

      if (moveScore > bestScore) {
        bestScore = moveScore;
      }
    }

    return bestScore;
  }

  // We minimize
  else {
    let bestScore: number = Infinity;

    for (let action of availableActions) {
      const clonedTiles = _.cloneDeep(newTiles);
      const moveScore = minimax(
        clonedTiles,
        action,
        negatePlayer(originalPlayer),
        depth + 1,
        originalPlayer
      );

      if (moveScore < bestScore) {
        bestScore = moveScore;
      }
    }

    return bestScore;
  }
};
