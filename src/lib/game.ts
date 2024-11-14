import { Role } from '@/types/role'
import { Tile } from '@/types/tile'

export function makeEmptyTiles(): Tile[] {
  return Array.from({ length: 9 }, (_, index) => ({
    index: index,
    filledBy: null,
  }))
}

export function getTheOtherRole(role: Role): Role {
  return role === 'X' ? 'O' : 'X'
}

/*
  Returns an array of the available actions (tile indexes) for a given tile array
*/
export const getAvailableActions = (tiles: Tile[]): number[] => {
  return [
    ...tiles
      .filter((tile: Tile) => !tile.filledBy)
      .map((tile: Tile) => tile.index),
  ]
}

/*
  Returns the winning player or null if there is no winner yet
*/
export const getWinningPlayer = (tiles: Tile[]): Role | 'tie' | null => {
  const availableActions = getAvailableActions(tiles)

  // If there are more than 4 tiles available, no one has won yet
  if (availableActions.length > 4) return null

  // Check the board vertically
  for (const index of [0, 1, 2]) {
    if (!tiles[index].filledBy) continue

    if (
      tiles[index].filledBy === tiles[index + 3].filledBy &&
      tiles[index].filledBy === tiles[index + 6].filledBy
    )
      return tiles[index].filledBy
  }

  // Check the board horizontally
  for (const index of [0, 3, 6]) {
    if (!tiles[index].filledBy) continue

    if (
      tiles[index].filledBy === tiles[index + 1].filledBy &&
      tiles[index].filledBy === tiles[index + 2].filledBy
    )
      return tiles[index].filledBy
  }

  // Check the board diagonally from 0 to 8
  if (
    tiles[0].filledBy &&
    tiles[0].filledBy === tiles[4].filledBy &&
    tiles[0].filledBy === tiles[8].filledBy
  )
    return tiles[0].filledBy

  // Check the board diagonally from 2 to 6
  if (
    tiles[2].filledBy &&
    tiles[2].filledBy === tiles[4].filledBy &&
    tiles[2].filledBy === tiles[6].filledBy
  )
    return tiles[2].filledBy

  // If no actions available after checking, it is a tie
  if (availableActions.length === 0) return 'tie'

  // No winning player, returning null
  return null
}
