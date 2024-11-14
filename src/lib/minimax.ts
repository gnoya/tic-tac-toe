import { Role } from '@/types/role'
import { Tile } from '@/types/tile'
import {
  getAvailableTileIndexes,
  getTheOtherRole,
  getWinningPlayer,
} from './game'
import _ from 'lodash'

export function getBestMoveTileIndex(tiles: Tile[], roleInTurn: Role): number {
  const availableTileIndexes = getAvailableTileIndexes(tiles)
  if (availableTileIndexes.length === 9) return 4

  let bestMove = 0
  let bestScore: number = -Infinity

  for (const tileIndex of availableTileIndexes) {
    const clonedTiles = _.cloneDeep(tiles)
    const moveScore = minimax({
      tiles: clonedTiles,
      tileIndexToPlay: tileIndex,
      currentRole: roleInTurn,
      depth: 1,
      originalRole: roleInTurn,
    })

    if (moveScore > bestScore) {
      bestMove = tileIndex
      bestScore = moveScore
    }
  }

  return bestMove
}

/*
  Minimax algorithm maximizes the score of the original player and minimizes the score of the
  opponent player. This is a recursive functions that returns the score of playing on a given tile index.
*/
export function minimax({
  tiles,
  tileIndexToPlay,
  currentRole,
  originalRole,
  depth,
}: {
  tiles: Tile[]
  tileIndexToPlay: number
  currentRole: Role
  depth: number
  originalRole: Role
}): number {
  const newTiles = simulateMove({
    tiles,
    tileIndex: tileIndexToPlay,
    role: currentRole,
  })
  const winningPlayer = getWinningPlayer(newTiles)

  // Game is finished because winningPlayer is the currentRole who just played
  if (winningPlayer === currentRole)
    return winningPlayer === originalRole ? 10000 / depth : -10000 / depth

  // Game tied
  if (winningPlayer === 'tie') return 0

  // Game is not finished
  const availableTileIndexes = getAvailableTileIndexes(newTiles)

  // We maximize
  if (originalRole !== currentRole) {
    let bestScore: number = -Infinity

    for (const availableTileIndex of availableTileIndexes) {
      const clonedTiles = _.cloneDeep(newTiles)
      const moveScore = minimax({
        tiles: clonedTiles,
        tileIndexToPlay: availableTileIndex,
        currentRole: originalRole,
        depth: depth + 1,
        originalRole,
      })

      if (moveScore > bestScore) bestScore = moveScore
    }

    return bestScore
  }

  // We minimize
  else {
    let bestScore: number = Infinity

    for (const availableTileIndex of availableTileIndexes) {
      const clonedTiles = _.cloneDeep(newTiles)
      const moveScore = minimax({
        tiles: clonedTiles,
        tileIndexToPlay: availableTileIndex,
        currentRole: getTheOtherRole(originalRole),
        depth: depth + 1,
        originalRole,
      })

      if (moveScore < bestScore) bestScore = moveScore
    }

    return bestScore
  }
}

export function simulateMove({
  tiles,
  tileIndex,
  role,
}: {
  tiles: Tile[]
  tileIndex: number
  role: Role
}): Tile[] {
  const clonedTiles: Tile[] = _.cloneDeep(tiles)

  if (clonedTiles[tileIndex].filledBy) {
    console.error('Playing on a filled tile')
    return []
  }

  // Change the filledBy to the given role
  clonedTiles[tileIndex].filledBy = role
  return clonedTiles
}
