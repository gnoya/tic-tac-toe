import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import RootRouter from './routers/root/root.router'

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <RootRouter />
      </BrowserRouter>
    </StrictMode>
  )
}

export default App
