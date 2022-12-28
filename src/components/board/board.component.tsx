import BoardTile from '../board-tile/board-tile.component'
import styles from './board.component.module.css'

interface BoardProps {}

export default function Board(props: BoardProps) {
  const {} = props

  const onTileClick = (type: string) => console.log(type)

  return (
    <div className={styles.container}>
      {Array(9)
        .fill(null)
        .map((_, index) => (
          <BoardTile
            key={index}
            type={index % 2 === 0 ? 'X' : 'O'}
            onClick={onTileClick}
          />
        ))}
    </div>
  )
}
