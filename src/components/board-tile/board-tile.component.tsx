import { Tile, TileIndex } from '../../models/tile.model'
import styles from './board-tile.component.module.css'

interface BoardTileProps extends Tile {
  disabled: boolean
  onClick?: (index: TileIndex) => void
}

export default function BoardTile({
  index,
  filledBy,
  disabled,
  onClick,
}: BoardTileProps) {
  return (
    <div
      className={styles.container}
      onClick={() =>
        !disabled && onClick && filledBy === 'empty' && onClick(index)
      }
    >
      <div className={styles[filledBy]}></div>
    </div>
  )
}
