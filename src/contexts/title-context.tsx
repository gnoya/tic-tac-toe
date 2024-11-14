import { createContext } from 'react'

export const titleContext = createContext<{
  title: string
  setTitle: (title: string) => void
}>({
  title: 'Tic tac toe',
  setTitle: () => {}
})
