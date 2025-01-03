import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import App from './templates/App.tsx'

const Main = () => {
  return (
    <StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App side="client" />
      </BrowserRouter>
    </StrictMode>
  )
}

export default Main