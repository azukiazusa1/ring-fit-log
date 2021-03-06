import Express from 'express'
import Boom from '@hapi/boom'
import httpStatusCode from 'http-status-codes'
import Record from '../models/Record'

export default {
  average: async (
    _req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const userId: string = res.locals.userId
    try {
      const average = await Record.average()
      const userAverage = await Record.averageByUser(userId)
      if (userAverage.length === 0) {
        userAverage.push({
          _id: null,
          avgTimeExercising: 0,
          avgCaloriesBurned: 0,
          avgDistanceRun: 0
        })
      }
      res.status(httpStatusCode.OK).json([...average, ...userAverage])
    } catch (e) {
      next(Boom.internal())
    }
  }
}
