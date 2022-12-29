import { Player } from './player.model'
import { Tile, TileIndex } from './tile.model'
import _ from 'lodash'

/*
    Board tiles: 

    0 | 1 | 2
    3 | 4 | 5
    6 | 7 | 8

*/

/*
  Plays the given index as the given player in the given tiles. 
  Returns the modified tiles' array.
*/
export const play = (
  tiles: Tile[],
  player: Player,
  index: TileIndex
): Tile[] => {
  const clonedTiles = _.cloneDeep(tiles)

  if (clonedTiles[index].filledBy !== 'empty') {
    console.error('Playing on a filled tile')
    return []
  }

  // Change the filledBy to the given player
  clonedTiles[index].filledBy = player
  return clonedTiles
}

/*
  Returns an array of the available actions (tile indexes) for a given tile array
*/
export const getAvailableActions = (tiles: Tile[]): TileIndex[] => {
  return [
    ...tiles
      .filter((tile: Tile) => tile.filledBy === 'empty')
      .map((tile: Tile) => tile.index),
  ]
}

/*
  Checks if the given board (the tiles) have a winning player, a tie or none.
  If there is a winning player, returns 'X' or 'O'.
  If there is a tie, returns 'tie'.
  If no winning player nor tie, returns null
*/
export const getWinningPlayer = (tiles: Tile[]): Player | 'tie' | null => {
  const availableActions = getAvailableActions(tiles)

  // If there are more than 4 tiles available, no one has won yet
  if (availableActions.length > 4) return null

  // If no actions available, it is a tie
  if (availableActions.length === 0) return 'tie'

  // Check the board vertically
  for (let index of [0, 1, 2]) {
    if (tiles[index].filledBy === 'empty') continue

    if (
      tiles[index].filledBy === tiles[index + 3].filledBy &&
      tiles[index].filledBy === tiles[index + 6].filledBy
    )
      return tiles[index].filledBy as Player
  }

  // Check the board horizontally
  for (let index of [0, 3, 6]) {
    if (tiles[index].filledBy === 'empty') continue

    if (
      tiles[index].filledBy === tiles[index + 1].filledBy &&
      tiles[index].filledBy === tiles[index + 2].filledBy
    )
      return tiles[index].filledBy as Player
  }

  // Check the board diagonally from 0 to 8
  if (
    tiles[0].filledBy !== 'empty' &&
    tiles[0].filledBy === tiles[4].filledBy &&
    tiles[0].filledBy === tiles[8].filledBy
  )
    return tiles[0].filledBy

  // Check the board diagonally from 2 to 6
  if (
    tiles[2].filledBy !== 'empty' &&
    tiles[2].filledBy === tiles[4].filledBy &&
    tiles[2].filledBy === tiles[6].filledBy
  )
    return tiles[2].filledBy

  // No winning player, returning null
  return null
}
