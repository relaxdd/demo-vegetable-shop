import './assets/css/style.css'
import { hydrateRoot, createRoot } from 'react-dom/client'
import Main from './Main.tsx'

function main() {
  // const context = (window as any)?.[SSR_PROP] || {}
  const root = document.getElementById('root')
  if (!root) return

  if (root.hasChildNodes() && root.childNodes[0].textContent !== 'app-html') {
    hydrateRoot(root, <Main />)
  } else {
    createRoot(root).render(<Main />)
  }
}

main()

