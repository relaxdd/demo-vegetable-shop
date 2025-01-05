import './assets/css/style.css'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import AppWrapper from './AppWrapper.tsx'
import { SSR_CTX_PROP } from './defines.ts'

const Main = () => {
  const pageData = (window as any)?.[SSR_CTX_PROP] || {}
  delete (window as any)?.[SSR_CTX_PROP]

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppWrapper pageData={pageData} />
    </BrowserRouter>
  )
}

function startClient() {
  const root = document.getElementById('root')!

  if (root.hasChildNodes() && root.childNodes[0].textContent !== 'app-html') {
    hydrateRoot(root, <Main />)
  } else {
    createRoot(root).render(<Main />)
  }
}

startClient()