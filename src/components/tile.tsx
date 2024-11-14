import { cn } from '@/lib/utils'
import { PlayerMark } from './player-mark'
import { Tile as TileType } from '@/types/tile'

interface TileProps {
  tile: TileType
  onClick: (index: number) => void
}

export function Tile({ tile, onClick }: TileProps) {
  return (
    <div
      onClick={() => onClick(tile.index)}
      className={cn(
        'grid h-full w-full bg-background',
        !tile.filledBy && 'cursor-pointer',
      )}
    >
      {tile.filledBy && <PlayerMark mark={tile.filledBy} />}
    </div>
  )
}