import { PlayerMark } from '@/components/player-mark'
import { Switch } from '@/components/ui/switch'
import { Typography } from './ui/typography'
import { Role } from '@/types/role'

interface RoleSwapperProps {
  userRole: Role
  onUserRoleSwap: (role: Role) => void
}
export function RoleSwapper({ userRole, onUserRoleSwap }: RoleSwapperProps) {
  return (
    <div className="grid justify-center gap-2">
      <Typography variant="h4">
        You can swap your role (you are {userRole})
      </Typography>
      <div className="flex items-center justify-center gap-4">
        <PlayerMark
          mark="X"
          className="cursor-pointer text-4xl"
          onClick={() => onUserRoleSwap('X')}
        />
        <Switch
          checked={userRole === 'O'}
          onCheckedChange={(checked) => onUserRoleSwap(checked ? 'O' : 'X')}
        />
        <PlayerMark
          mark="O"
          className="cursor-pointer text-4xl"
          onClick={() => onUserRoleSwap('O')}
        />
      </div>
    </div>
  )
}
