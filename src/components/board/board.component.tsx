import { TileIndex } from '../../models/tile.model'
import BoardTile from '../board-tile/board-tile.component'
import styles from './board.component.module.css'

interface BoardProps {}

export default function Board(props: BoardProps) {
  const {} = props

  const onTileClick = (index: TileIndex) => console.log(index)

  return (
    <div className={styles.container}>
      {Array(9)
        .fill(null)
        .map((_, index) => (
          <BoardTile
            key={index}
            index={index as TileIndex}
            filledBy={'empty'}
            onClick={onTileClick}
          />
        ))}
    </div>
  )
}
