import Express from 'express'
import { boomify, Boom } from '@hapi/boom'
import { NOT_FOUND } from 'http-status-codes'

export default {
  notFound: (_req: Express.Request, res: Express.Response) => {
    res.status(NOT_FOUND)
    res.json({ message: 'Not Found' })
  },
  errorHandler: (
    err: Error,
    _req: Express.Request,
    res: Express.Response,
    _next: Express.NextFunction
  ) => {
    const boomErr: Boom = boomify(err)
    const { statusCode, message } = boomErr.output.payload
    if (boomErr.isServer) {
      res.status(500)
      res.json({ message: 'Internal Server Error' })
    }
    res.status(statusCode)
    res.json({ message })
    process.sentry.captureMessage(message)
  }
}
