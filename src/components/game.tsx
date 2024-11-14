import { useTicTacToe } from '@/hooks/use-tic-tac-toe'
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
  } = useTicTacToe()

  return (
    <div className="grid items-center justify-items-center gap-8 justify-self-center">
      <Board
        tiles={tiles}
        onTileClick={(index: number) => onTilePlay(index, userRole)}
      />
      <RoleSwapper userRole={userRole} onUserRoleSwap={onUserRoleSwap} />
      {gameEnded && (
        <Button variant="secondary" onClick={restartGame} className="w-1/2">
          Restart game
        </Button>
      )}
    </div>
  )
}
