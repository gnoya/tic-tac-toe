export type Player = 'X' | 'O'

export const negatePlayer = (player: Player): Player => {
  return player === 'X' ? 'O' : 'X'
}
