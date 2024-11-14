import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { ThemeProvider } from '@/providers/theme-provider'
import { TitleProvider } from '@/providers/title-provider'
import { Toaster } from '@/components/ui/sonner'
import './app.css'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TitleProvider>
        <RouterProvider router={router} />
      </TitleProvider>
      <Toaster position="bottom-center" />
    </ThemeProvider>
  )
}

export default App
