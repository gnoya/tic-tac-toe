import { Player } from './player.model'
import { Tile, TileIndex } from './tile.model'
const _ = require('lodash')

/*
    Board tiles: 

    0 | 1 | 2
    3 | 4 | 5
    6 | 7 | 8
  */

export const play = (
  tiles: Tile[],
  player: Player,
  index: TileIndex
): Tile[] => {
  const clonedTiles = _.cloneDeep(tiles)

  if (clonedTiles[index].filledBy !== 'empty') {
    console.log('Playing on a filled tile')
    return []
  }

  clonedTiles[index].filledBy = player
  return clonedTiles
}

export const getAvailableActions = (tiles: Tile[]): TileIndex[] => {
  return [
    ...tiles
      .filter((tile: Tile) => tile.filledBy === 'empty')
      .map((tile: Tile) => tile.index),
  ]
}

export const getWinningPlayer = (tiles: Tile[]): Player | 'tie' | null => {
  // if there are more than 4 tiles available, no one has won yet
  const availableActions = getAvailableActions(tiles)
  if (availableActions.length > 4) return null
  if (availableActions.length === 0) return 'tie'

  // check vertically
  for (let index of [0, 1, 2]) {
    if (tiles[index].filledBy === 'empty') continue

    if (
      tiles[index].filledBy === tiles[index + 3].filledBy &&
      tiles[index].filledBy === tiles[index + 6].filledBy
    )
      return tiles[index].filledBy as Player
  }

  // check horizontally
  for (let index of [0, 3, 6]) {
    if (tiles[index].filledBy === 'empty') continue

    if (
      tiles[index].filledBy === tiles[index + 1].filledBy &&
      tiles[index].filledBy === tiles[index + 2].filledBy
    )
      return tiles[index].filledBy as Player
  }

  // check diagonally from 0 to 8
  if (
    tiles[0].filledBy !== 'empty' &&
    tiles[0].filledBy === tiles[4].filledBy &&
    tiles[0].filledBy === tiles[8].filledBy
  )
    return tiles[0].filledBy

  // check diagonally from 2 to 6
  if (
    tiles[2].filledBy !== 'empty' &&
    tiles[2].filledBy === tiles[4].filledBy &&
    tiles[2].filledBy === tiles[6].filledBy
  )
    return tiles[2].filledBy

  return null
}
