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
    process.sentry.captureException(err)
    const boomErr: Boom = boomify(err)
    if (boomErr.isServer) {
      res.status(500)
      res.json({ message: 'Internal Server Error' })
    }

    const { statusCode, message } = boomErr.output.payload
    res.status(statusCode)
    res.json({ message })
  }
}
