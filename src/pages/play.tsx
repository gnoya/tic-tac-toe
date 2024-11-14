import { Game } from '@/components/game'
import { Typography } from '@/components/ui/typography'
import { useTitle } from '@/hooks/use-title'

export function Play() {
  useTitle('Play')

  return (
    <div className="grid h-fit gap-8">
      <Typography variant="h1">Tic Tac Toe</Typography>
      <Typography variant="h2">
        You will play against a powerful AI! Can you beat it?
      </Typography>
      <Game />
    </div>
  )
}
