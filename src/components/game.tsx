import { usePlayGame } from '@/hooks/use-play-game'
import { Board } from './board'
import { RoleSwapper } from './role-swapper'
import { Button } from './ui/button'

export function Game() {
  const {
    tiles,
    userRole,
    gameEnded,
    onUserRoleSwap,
    onTilePlay,
    restartGame,
  } = usePlayGame()

  return (
    <div className="grid gap-8 justify-self-center">
      <Board
        tiles={tiles}
        onTileClick={(index: number) => onTilePlay(index, userRole)}
      />
      <RoleSwapper userRole={userRole} onUserRoleSwap={onUserRoleSwap} />
      {gameEnded && (
        <Button variant="secondary" onClick={restartGame}>
          Restart game
        </Button>
      )}
    </div>
  )
}
