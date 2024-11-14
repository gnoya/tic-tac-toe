import { ReactNode, useEffect, useState } from 'react'
import { titleContext } from '@/contexts/title-context'

const TITLE_TEMPLATE = '%s | Tic Tac Toe'

interface TitleProviderProps {
  children: ReactNode
}
export function TitleProvider({ children }: TitleProviderProps) {
  const [title, setTitle] = useState('')

  useEffect(() => {
    document.title = TITLE_TEMPLATE.replace('%s', title)
  }, [title])

  return (
    <titleContext.Provider value={{ title, setTitle }}>
      {children}
    </titleContext.Provider>
  )
}
