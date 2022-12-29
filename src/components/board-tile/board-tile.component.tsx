import { Tile, TileIndex } from '../../models/tile.model'
import styles from './board-tile.component.module.css'

interface BoardTileProps extends Tile {
  onClick?: (index: TileIndex) => void
}

export default function BoardTile(props: BoardTileProps) {
  const { index, filledBy, onClick } = props

  return (
    <div
      className={styles.container}
      onClick={() => onClick && filledBy === 'empty' && onClick(index)}
    >
      <div className={styles[filledBy]}></div>
    </div>
  )
}
