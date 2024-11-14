import { ThemeToggler } from '@/components/theme-toggler'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="relative grid min-h-screen w-full place-items-center">
      <ThemeToggler className="absolute right-8 top-8" />
      <main className="h-full overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}
