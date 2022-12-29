export type Player = 'X' | 'O'

/*
  Returns the opposite player of the given one.
  Example: argument: 'X' returns 'O' and viceversa.
*/
export const negatePlayer = (player: Player): Player => {
  return player === 'X' ? 'O' : 'X'
}
