import { Role } from '@/types/role'
import { useCallback, useEffect, useState } from 'react'
import { getTheOtherRole, getWinningPlayer, makeEmptyTiles } from '@/lib/game'
import { Tile } from '@/types/tile'
import { FIRST_TO_PLAY, USER_DEFAULT_ROLE } from '@/constants/game'
import { toast } from 'sonner'
import { getBestMoveTileIndex } from '@/lib/minimax'

export function useTicTacToe() {
  const [tiles, setTiles] = useState<Tile[]>(makeEmptyTiles())
  const [userRole, setUserRole] = useState<Role>(USER_DEFAULT_ROLE)
  const [roleInTurn, setRoleInTurn] = useState<Role>(FIRST_TO_PLAY)
  const [gameEnded, setGameEnded] = useState<boolean>(false)

  const restartGame = useCallback(() => {
    setRoleInTurn(FIRST_TO_PLAY)
    setTiles(makeEmptyTiles())
    setGameEnded(false)
  }, [])

  const onUserRoleSwap = useCallback(
    (role: Role) => {
      setUserRole(role)
      restartGame()
    },
    [restartGame],
  )

  const onTilePlay = useCallback(
    (index: number, role: Role) => {
      // If the tile is already filled or it's not the user's turn, return
      if (tiles[index].filledBy || roleInTurn !== role || gameEnded) return

      setRoleInTurn(getTheOtherRole(roleInTurn))
      setTiles((prevTiles) => {
        const newTiles = [...prevTiles]
        newTiles[index].filledBy = roleInTurn
        return newTiles
      })
    },
    [tiles, roleInTurn, gameEnded],
  )

  const onGameEnd = useCallback(
    (winningPlayer: Role | 'tie') => {
      setGameEnded(true)

      if (winningPlayer === 'tie') toast.info('It is a tie!')
      else {
        if (winningPlayer === userRole) toast.success('You won!')
        else toast.error('AI won!')
      }
    },
    [userRole],
  )

  const onTileChange = useCallback(() => {
    // Check if the game ended
    const winningPlayer = getWinningPlayer(tiles)
    if (winningPlayer && !gameEnded) return onGameEnd(winningPlayer)

    // If it's the user's turn or the game ended, return
    if (roleInTurn === userRole || gameEnded) return

    // AI's turn
    const aiTileIndex = getBestMoveTileIndex(tiles, getTheOtherRole(userRole))
    setTimeout(() => onTilePlay(aiTileIndex, getTheOtherRole(userRole)), 500)
  }, [tiles, userRole, roleInTurn, gameEnded, onTilePlay, onGameEnd])

  useEffect(() => {
    onTileChange()
  }, [onTileChange])

  return {
    tiles,
    userRole,
    gameEnded,
    onUserRoleSwap,
    onTilePlay,
    restartGame,
  }
}
