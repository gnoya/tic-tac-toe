import { createBrowserRouter } from 'react-router-dom'
import { Play } from '@/pages/play'

export const router = createBrowserRouter([
  {
    path: '',
    element: <Play />,
  },
])
