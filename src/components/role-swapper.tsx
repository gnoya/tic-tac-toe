import { PlayerMark } from '@/components/player-mark'
import { Switch } from '@/components/ui/switch'
import { Typography } from './ui/typography'
import { Role } from '@/types/role'

interface RoleSwapperProps {
  role: Role
  setRole: (role: Role) => void
}
export function RoleSwapper({ role, setRole }: RoleSwapperProps) {
  return (
    <div className="grid justify-center gap-2">
      <Typography variant="h4">
        You can swap your role (you are {role})
      </Typography>
      <div className="flex items-center justify-center gap-4">
        <PlayerMark
          mark="X"
          className="cursor-pointer text-4xl"
          onClick={() => setRole('X')}
        />
        <Switch
          checked={role === 'O'}
          onCheckedChange={(checked) => setRole(checked ? 'O' : 'X')}
        />
        <PlayerMark
          mark="O"
          className="cursor-pointer text-4xl"
          onClick={() => setRole('O')}
        />
      </div>
    </div>
  )
}
