import { cn } from '@/lib/utils'
import { Role } from '@/types/role'

interface PlayerMarkProps {
  mark: Role
  className?: string
  onClick?: () => void
}

export function PlayerMark({ mark, className, onClick }: PlayerMarkProps) {
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
