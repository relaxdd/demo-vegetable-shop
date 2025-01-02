import path from 'path'
import jsonServer from 'json-server'

function apiDataBase(__dirname: string) {
  const server = jsonServer.create()
  const router = jsonServer.router(path.join(__dirname, 'db.json'))
  const middlewares = jsonServer.defaults()

  server.use(middlewares)
  server.use(router)

  return server
}

export default apiDataBase