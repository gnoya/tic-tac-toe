import { useState } from 'react'
import { Player } from '../../models/player.model'
import { play } from '../../models/board.model'
import { makeEmptyTiles, Tile, TileIndex } from '../../models/tile.model'
import BoardTile from '../board-tile/board-tile.component'
import styles from './board.component.module.css'

interface BoardProps {}

export default function Board(props: BoardProps) {
  const [tiles, setTiles] = useState<Tile[]>(makeEmptyTiles())
  const [player] = useState<Player>('X')

  const onTileClick = (index: TileIndex) => {
    setTiles((prevState: any) => {
      const newTiles: Tile[] = play(prevState, player, index)
      return newTiles
    })
  }

  return (
    <div className={styles.container}>
      {tiles.map((tile: Tile, index) => (
        <BoardTile
          key={index}
          index={tile.index}
          filledBy={tile.filledBy}
          onClick={onTileClick}
        />
      ))}
    </div>
  )
}
