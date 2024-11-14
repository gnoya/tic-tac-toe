import { createBrowserRouter } from 'react-router-dom'
import { Play } from '@/pages/play'
import { AppLayout } from './layouts/app-layout'

export const router = createBrowserRouter([
  {
    path: '',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <Play />,
      },
    ],
  },
])
