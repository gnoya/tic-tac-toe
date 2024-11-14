import { usePlayGame } from '@/hooks/use-play-game'
import { Board } from './board'
import { RoleSwapper } from './role-swapper'

export function Game() {
  const { tiles, userRole, onUserRoleSwap, onTileClick } = usePlayGame()

  return (
    <div className="grid gap-8 justify-self-center">
      <Board
        tiles={tiles}
        onTileClick={(index: number) => onTileClick(index, userRole)}
      />
      <RoleSwapper userRole={userRole} onUserRoleSwap={onUserRoleSwap} />
    </div>
  )
}
