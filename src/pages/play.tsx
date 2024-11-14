import { Game } from '@/components/game'
import { Typography } from '@/components/ui/typography'
import { useTitle } from '@/hooks/use-title'

export function Play() {
  useTitle('Play')

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <Typography variant="h1">Tic Tac Toe</Typography>
        <Typography variant="h2">
          You will play against a powerful AI! Can you beat it?
        </Typography>
      </div>
      <Game />
    </div>
  )
}
