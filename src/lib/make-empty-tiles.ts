import { Tile } from '@/types/tile'

export function makeEmptyTiles(): Tile[] {
  return Array.from({ length: 9 }, (_, index) => ({
    index: index,
    filledBy: null,
  }))
}
