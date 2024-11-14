import { useContext, useEffect } from 'react'
import { titleContext } from '@/contexts/title-context'

export function useTitle(title?: string) {
  const ctx = useContext(titleContext)

  useEffect(() => {
    if (title) ctx.setTitle(title)
  }, [ctx, title])

  return ctx
}
