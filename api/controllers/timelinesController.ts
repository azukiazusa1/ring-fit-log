import Express from 'express'
import httpStatus from 'http-status-codes'
import Boom from '@hapi/boom'

export default {
  list: (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { page, limit } = req.body
    try {
      res.status(httpStatus.OK).json({ message: 'OK' })
    } catch (e) {
      next(Boom.internal())
    }
  }
}
