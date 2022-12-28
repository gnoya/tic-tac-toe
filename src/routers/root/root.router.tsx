import { Route, Routes } from 'react-router'
import GamePage from '../../pages/game/game.page'

export default function RootRouter() {
  return (
    <Routes>
      <Route path="/" element={<GamePage />} />
    </Routes>
  )
}
