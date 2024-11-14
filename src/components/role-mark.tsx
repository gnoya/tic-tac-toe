import { cn } from '@/lib/utils'
import { Role } from '@/types/role'

interface RoleMarkProps {
  mark: Role
  className?: string
  onClick?: () => void
}

export function RoleMark({ mark, className, onClick }: RoleMarkProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'animate-mark-appear select-none place-self-center self-center text-7xl',
        mark === 'X' ? 'text-primary' : 'text-secondary',
        className,
      )}
    >
      {mark}
    </div>
  )
}
