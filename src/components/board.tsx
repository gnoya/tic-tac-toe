import { Tile as TyleType } from '@/types/tile'
import { Tile } from './tile'

interface BoardProps {
  tiles: TyleType[]
  onTileClick: (index: number) => void
}

export function Board({ tiles, onTileClick }: BoardProps) {
  return (
    <div className="grid w-fit grid-cols-[100px_100px_100px] grid-rows-[100px_100px_100px] place-items-center gap-2 bg-primary">
      {tiles.map((tile, index) => (
        <Tile key={index} tile={tile} onClick={onTileClick} />
      ))}
    </div>
  )
}
