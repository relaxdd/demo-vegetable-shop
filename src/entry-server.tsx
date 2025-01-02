import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './templates/App.tsx'
import { Helmet } from 'react-helmet'
import { Request } from 'express'

export async function render(request: Request) {
  // const products = await fetchProducts()
  // const context = { products }
  // const head = `<script>window['${SSR_PROP}'] = ${JSON.stringify(context)}</script>`

  const html = renderToString(
    <StaticRouter location={request.originalUrl}>
      <App side="server" request={request} />
    </StaticRouter>,
  )

  const helmet = Helmet.renderStatic()
  const head = `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`

  return { html, head }
}
