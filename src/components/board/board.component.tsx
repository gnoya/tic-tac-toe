import { useEffect, useState } from 'react'
import { Player, negatePlayer } from '../../models/player.model'
import { getAvailableActions, play } from '../../models/board.model'
import { getBestMove } from '../../models/ai.model'
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

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      const availableActions = getAvailableActions(tiles)
      const aiPlayer = negatePlayer(player)

      if (availableActions.length % 2 === 0) {
        const bestMove: TileIndex = getBestMove(tiles, aiPlayer)
        setTiles(() => play(tiles, aiPlayer, bestMove))
      }
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [tiles, player])

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
