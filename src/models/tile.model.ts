import { Player } from './player.model'

export type TileIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type TileFill = Player | 'empty'

export interface Tile {
  index: TileIndex
  filledBy: TileFill
}

export const makeEmptyTiles = () =>
  Array(9)
    .fill(undefined)
    .map((_, index: number): Tile => {
      return { index: index as TileIndex, filledBy: 'empty' }
    })
