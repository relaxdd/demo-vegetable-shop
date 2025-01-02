import './assets/css/style.css'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './templates/App.tsx'

function main() {
  // const context = (window as any)?.[SSR_PROP] || {}
  const root = document.getElementById('root')
  if (!root) return

  hydrateRoot(
    root,
    <BrowserRouter>
      <App side="client" />
    </BrowserRouter>,
  )
}

main()

