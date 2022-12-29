import { useEffect, useState } from 'react'
import { Player, negatePlayer } from '../../models/player.model'
import {
  play,
  getWinningPlayer,
  getPlayerInTurn,
} from '../../models/board.model'
import { getBestMove } from '../../models/ai.model'
import { makeEmptyTiles, Tile, TileIndex } from '../../models/tile.model'
import BoardTile from '../board-tile/board-tile.component'
import styles from './board.component.module.css'
import { useModal } from '../../hooks/use-modal/use-modal.hook'
import ToggleSwitch from '../toggle-switch/toggle-switch.component'
import Text from '../text/text.component'

export default function Board() {
  const [tiles, setTiles] = useState<Tile[]>(makeEmptyTiles())
  const [player, setPlayer] = useState<Player>('X')
  const modal = useModal()
  const playersTurn: boolean = getPlayerInTurn(tiles) === player

  /*
    Gets the index of the clicked tile and updates the tiles state
    after that tile is played by the user (only the user/player can click)
  */
  const onTileClick = (index: TileIndex) => {
    setTiles((prevState: Tile[]) => {
      const newTiles: Tile[] = play(prevState, player, index)
      return newTiles
    })
  }

  /*
    Receives the value of the toggle:
    True means that the user chose to be 'O'
    False means that the user chose to be 'X'
  */
  const onSwitchToggle = (value: boolean) => {
    setPlayer(value ? 'O' : 'X')
    setTiles(makeEmptyTiles())
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
      const aiPlayer = negatePlayer(player)

      // Check if AI is the one to play
      if (
        (getPlayerInTurn(tiles) === 'O' && aiPlayer === 'O') ||
        (getPlayerInTurn(tiles) === 'X' && aiPlayer === 'X')
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
      <div className={styles.yourTurnMsgContainer}>
        {playersTurn && <Text>It's your turn!</Text>}
      </div>

      <div className={styles.boardContainer}>
        {tiles.map((tile: Tile, index) => (
          <BoardTile
            key={index}
            index={tile.index}
            filledBy={tile.filledBy}
            disabled={!playersTurn}
            onClick={onTileClick}
          />
        ))}
      </div>

      <div className={styles.panelContainer}>
        <Text>You can swap your role (you are {player}):</Text>
        <div className={styles.toggleContainer}>
          <BoardTile index={0} filledBy={'X'} disabled={true} inBoard={false} />
          <ToggleSwitch onToggle={onSwitchToggle} />
          <BoardTile index={0} filledBy={'O'} disabled={true} inBoard={false} />
        </div>
      </div>
    </div>
  )
}
