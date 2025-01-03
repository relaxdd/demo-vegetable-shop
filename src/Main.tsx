import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import App from './templates/App.tsx'

const Main = () => (
  <StrictMode>
    <BrowserRouter>
      <App side="client" />
    </BrowserRouter>
  </StrictMode>
)

export default Main