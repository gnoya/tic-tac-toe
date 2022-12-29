import { getAvailableActions, getWinningPlayer, play } from './board.model'
import { Player } from './player.model'
import { Tile, TileIndex } from './tile.model'
var _ = require('lodash')

export interface AIAction {
  index: TileIndex
  score: number
}

export const getBestMove = (tiles: Tile[], aiPlayer: Player): TileIndex => {
  const availableActions = getAvailableActions(tiles)

  let bestMove: TileIndex = 0
  let bestScore: number = -Infinity

  for (let action of availableActions) {
    const clonedTiles = _.cloneDeep(tiles)
    const moveScore = minimax(clonedTiles, action, aiPlayer, aiPlayer, 1)

    if (moveScore > bestScore) {
      bestMove = action
      bestScore = moveScore
    }
  }

  return bestMove
}

export const negatePlayer = (player: Player): Player => {
  return player === 'X' ? 'O' : 'X'
}

export const minimax = (
  tiles: Tile[],
  action: TileIndex,
  player: Player,
  aiPlayer: Player,
  depth: number
): number => {
  const newTiles = play(tiles, player, action)
  let winningPlayer = getWinningPlayer(newTiles)

  // game is finished
  if (winningPlayer === player) {
    return winningPlayer === aiPlayer ? 10000 / depth : -10000 / depth
  }

  if (winningPlayer === 'tie') {
    return 0
  }

  // game is not finished
  const availableActions = getAvailableActions(newTiles)

  // we maximize
  if (aiPlayer !== player) {
    let bestScore: number = -Infinity

    for (let action of availableActions) {
      const newTiles = _.cloneDeep(tiles)
      const moveScore = minimax(newTiles, action, aiPlayer, aiPlayer, depth + 1)

      if (moveScore > bestScore) {
        bestScore = moveScore
      }
    }

    return bestScore
  }

  // we minimize
  else {
    let bestScore: number = Infinity

    for (let action of availableActions) {
      const newTiles = _.cloneDeep(tiles)
      const moveScore = minimax(
        newTiles,
        action,
        negatePlayer(aiPlayer),
        aiPlayer,
        depth + 1
      )

      if (moveScore < bestScore) {
        bestScore = moveScore
      }
    }

    return bestScore
  }
}
