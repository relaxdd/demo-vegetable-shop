import fs from 'node:fs/promises'
import express, { Request } from 'express'
import { ViteDevServer } from 'vite'
import apiJsonServer from './src/server/apiDataBase.ts'
import apiRouter from './src/server/apiRouter.ts'

// Constants
const isProd = process.env.NODE_ENV === 'production'
const port = +(process.env.PORT || 5173)
const base = process.env.BASE || '/'
const expose = process.env.EXPOSE || false

// Cached production assets
const templateHtml = isProd
  ? await fs.readFile('./dist-ssr/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()
const __dirname = import.meta.dirname

// Add Vite or respective production middlewares
let vite: ViteDevServer | undefined
if (!isProd) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist-ssr/client', { extensions: [] }))
}

// Provide API
app.use('/api/v1', apiRouter())
app.use('/api/db', apiJsonServer(__dirname))

// app.get(/.*\.js.map$/, (_, res) => {
//   res.status(404).end()
// })

// Serve HTML
app.get('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template: string
    let render: (request: Request) => Promise<{ html: string, head: string }>

    if (!isProd) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite!.transformIndexHtml(url, template)
      render = (await vite!.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist-ssr/server/entry-server.js' as any)).render
    }

    const rendered = await render(req)

    const html = template
    .replace(`<!--app-head-->`, rendered.head ?? '')
    .replace(`<!--app-html-->`, rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    const err = e as Error
    vite?.ssrFixStacktrace(err)
    console.log(err.stack)
    res.status(500).end(err.stack)
  }
})

const listenCb = () => {
  console.log(`Server started at http://localhost:${port}`)
}

// Start http server
if (!expose) app.listen(port, listenCb)
else app.listen(port, '0.0.0.0', listenCb)