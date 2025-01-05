import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { SSR_CTX_PROP } from './defines.ts'
import App, { loadPageData } from './templates/App.tsx'
import { Helmet } from 'react-helmet'
import { Request } from 'express'

export async function render(request: Request) {
  const pageData = await loadPageData(request.originalUrl)

  const html = renderToString(
    <StaticRouter
      location={request.originalUrl}
      basename={import.meta.env.BASE_URL}
    >
      <App
        side="server"
        request={request}
        pageData={pageData}
        isLoading={false}
      />
    </StaticRouter>,
  )

  const helmet = Helmet.renderStatic()

  const head = `
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
  <script>window['${SSR_CTX_PROP}'] = ${JSON.stringify(pageData)}</script>`

  return { html, head }
}
