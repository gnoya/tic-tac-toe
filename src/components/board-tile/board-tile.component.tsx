import styles from './board-tile.component.module.css'

interface BoardTileProps {
  type: 'X' | 'O'
  onClick?: (type: string) => void
}

export default function BoardTile(props: BoardTileProps) {
  const { type, onClick } = props

  return (
    <div className={styles.container}>
      <div
        className={styles[type]}
        onClick={() => onClick && onClick(type)}
      ></div>
    </div>
  )
}
