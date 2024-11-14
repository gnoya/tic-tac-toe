import { useContext } from 'react'
import { themeContext } from '@/contexts/theme-context'

export function useTheme() {
  return useContext(themeContext)
}
