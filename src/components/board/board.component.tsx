import { useEffect, useState } from 'react'
import { Player, negatePlayer } from '../../models/player.model'
import {
  getAvailableActions,
  play,
  getWinningPlayer,
} from '../../models/board.model'
import { getBestMove } from '../../models/ai.model'
import { makeEmptyTiles, Tile, TileIndex } from '../../models/tile.model'
import BoardTile from '../board-tile/board-tile.component'
import styles from './board.component.module.css'
import { useModal } from '../../hooks/use-modal/use-modal.hook'

interface BoardProps {}

export default function Board(props: BoardProps) {
  const [tiles, setTiles] = useState<Tile[]>(makeEmptyTiles())
  const [player] = useState<Player>('O')
  const modal = useModal()

  /*
    Gets the index of the clicked tile and updates the tiles state
    after that tile is played by the user (only the user/player can click)
  */
  const onTileClick = (index: TileIndex) => {
    setTiles((prevState: any) => {
      const newTiles: Tile[] = play(prevState, player, index)
      return newTiles
    })
  }

  /*
    Every time the tiles array is modified by the user click, we check if game is finished. 
    If it is finished, we notify the user and clear the board.
    If it is not finished, wait a few ms and then get the best move and play it.
  */
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const winningPlayer: Player | 'tie' | null = getWinningPlayer(tiles)

    // Someone won or game is tied
    if (winningPlayer !== null) {
      const notificationText =
        winningPlayer === 'tie'
          ? 'The game is a tie!'
          : winningPlayer === player
          ? 'You win!'
          : 'The AI wins!'

      timeout = setTimeout(() => {
        modal
          .fire({
            title: 'Game finished',
            text: notificationText,
            showCancelButton: false,
            allowOutsideClick: true,
          })
          .then(() => {
            // Reset the board
            setTiles(makeEmptyTiles())
          })
      }, 300)

      return
    }

    timeout = setTimeout(() => {
      const availableActions = getAvailableActions(tiles)
      const aiPlayer = negatePlayer(player)

      // If the mod 2 of the available actions length is 0, then it is 'O's turn
      if (
        (availableActions.length % 2 === 0 && aiPlayer === 'O') ||
        (availableActions.length % 2 !== 0 && aiPlayer === 'X')
      ) {
        const bestMove: TileIndex = getBestMove(tiles, aiPlayer)
        setTiles(() => play(tiles, aiPlayer, bestMove))
      }
    }, 250)

    // Clear the timeout in case of unmount
    return () => {
      clearTimeout(timeout)
    }
  }, [tiles, player, modal])

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
