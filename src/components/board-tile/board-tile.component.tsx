import { Tile, TileIndex } from '../../models/tile.model'
import styles from './board-tile.component.module.css'

interface BoardTileProps extends Tile {
  disabled: boolean // to disable the onClick function
  inBoard?: boolean // true to use it in the board, false to use it outside the board
  onClick?: (index: TileIndex) => void
}

export default function BoardTile({
  index,
  filledBy,
  disabled,
  inBoard = true,
  onClick,
}: BoardTileProps) {
  return (
    <div
      className={`${styles.container} ${inBoard && styles.inBoard}`}
      onClick={() =>
        !disabled && onClick && filledBy === 'empty' && onClick(index)
      }
    >
      <div className={`${styles[filledBy]} ${inBoard && styles.inBoard}`}></div>
    </div>
  )
}
