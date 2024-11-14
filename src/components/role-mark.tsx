import { cn } from '@/lib/utils'
import { Role } from '@/types/role'

interface RoleMarkProps {
  mark: Role
  className?: string
  onClick?: () => void
}

export function RoleMark({ mark, className, onClick }: RoleMarkProps) {
  return mark === 'X' ? (
    <div
      onClick={onClick}
      className={cn(
        'select-none place-self-center self-center text-7xl text-primary',
        className,
      )}
    >
      X
    </div>
  ) : (
    <div
      onClick={onClick}
      className={cn(
        'select-none place-self-center self-center text-7xl text-secondary',
        className,
      )}
    >
      O
    </div>
  )
}
