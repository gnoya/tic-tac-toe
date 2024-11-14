import { Role } from '@/types/role'
import { useCallback, useEffect, useState } from 'react'
import { getTheOtherRole, getWinningPlayer, makeEmptyTiles } from '@/lib/game'
import { Tile } from '@/types/tile'
import { FIRST_TO_PLAY } from '@/constants/game'
import { toast } from 'sonner'

export function usePlayGame() {
  const [tiles, setTiles] = useState<Tile[]>(makeEmptyTiles())
  const [userRole, setUserRole] = useState<Role>(FIRST_TO_PLAY)
  const [playerTurn, setPlayerTurn] = useState<Role>(FIRST_TO_PLAY)

  const onTileClick = useCallback(
    (index: number, player: Role) => {
      // If the tile is already filled or it's not the user's turn, return
      if (tiles[index].filledBy || playerTurn !== player) return

      setTiles((prevTiles) => {
        const newTiles = [...prevTiles]
        newTiles[index].filledBy = playerTurn
        setPlayerTurn(getTheOtherRole(playerTurn))
        return newTiles
      })
    },
    [tiles, playerTurn],
  )

  const restartGame = useCallback(() => {
    setTiles(makeEmptyTiles())
    setPlayerTurn(FIRST_TO_PLAY)
  }, [])

  const onUserRoleSwap = useCallback(
    (role: Role) => {
      setUserRole(role)
      restartGame()
    },
    [restartGame],
  )

  const onGameEnd = useCallback(
    (winningPlayer: Role | 'tie') => {
      if (winningPlayer === 'tie') toast.info('It is a tie!')
      else {
        if (winningPlayer === userRole) toast.success('You won!')
        else toast.error('AI won!')
      }

      const timeout = setTimeout(restartGame, 3000)
      return () => clearTimeout(timeout)
    },
    [userRole, restartGame],
  )

  const onTileChange = useCallback(() => {
    // Check if the game ended
    const winningPlayer = getWinningPlayer(tiles)
    if (winningPlayer) return onGameEnd(winningPlayer)

    // If it's the user's turn, return
    if (playerTurn === userRole) return

    // AI's turn
    const timer = setTimeout(() => {
      const emptyTiles = tiles.filter((tile) => !tile.filledBy)
      const randomIndex = Math.floor(Math.random() * emptyTiles.length)
      onTileClick(emptyTiles[randomIndex].index, getTheOtherRole(userRole))
    }, 500)

    return () => clearTimeout(timer)
  }, [tiles, userRole, playerTurn, onTileClick, onGameEnd])

  useEffect(() => {
    onTileChange()
  }, [onTileChange])

  return {
    tiles,
    userRole,
    onUserRoleSwap,
    onTileClick,
  }
}
