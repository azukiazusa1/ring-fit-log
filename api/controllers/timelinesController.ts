import Express from 'express'
import httpStatus from 'http-status-codes'
import Boom from '@hapi/boom'
import Timeline from '../models/Timeline'

export default {
  list: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { page, limit } = req.query
    try {
      const result = await Timeline.paginate(
        {},
        {
          page: Number(page),
          limit: Number(limit),
          sort: { createdAt: -1 }
        }
      )
      res.status(httpStatus.OK).json(result)
    } catch (e) {
      console.log(e)
      next(Boom.internal())
    }
  }
}
