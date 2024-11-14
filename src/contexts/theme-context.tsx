import { createContext } from 'react'
import { Theme } from '@/types/theme'

export const themeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: 'system',
  setTheme: () => null
})
