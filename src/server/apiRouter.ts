import { Router } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import type { Request, Response, NextFunction } from 'express'

class Controller {
  public static helloWorld(_: Request, res: Response, next: NextFunction) {
    try {
      res.json({ message: 'Hello world!' })
    } catch (e) {
      next(e)
    }
  }
}

function apiRouter() {
  const router = Router()

  router.use(bodyParser.json())
  router.use(cookieParser())

  router.get('/', Controller.helloWorld)

  return router
}

export default apiRouter