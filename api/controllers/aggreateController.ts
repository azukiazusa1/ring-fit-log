import Express from 'express'
import Boom from '@hapi/boom'
import httpStatusCode from 'http-status-codes'
import Record from '../models/Record'

export default {
  average: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const userId: string = res.locals.userId
    try {
      const average = await Record.average()
      const userAverage = await Record.averageByUser(userId)
      res.status(httpStatusCode.OK).json([...average, ...userAverage])
    } catch (e) {
      next(Boom.internal())
    }
  },
}