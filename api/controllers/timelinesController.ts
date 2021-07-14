import Express from 'express'
import httpStatus from 'http-status-codes'
import Boom from '@hapi/boom'
import Timeline, { convert } from '../models/Timeline'

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
      res.status(httpStatus.OK).json(convert(result, res.locals.userId))
    } catch (e) {
      console.log(e)
      next(Boom.internal())
    }
  },
  like: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { id } = req.params
    try {
      await Timeline.toggleLike(id, res.locals.userId)
      res.sendStatus(204)
    } catch (e) {
      console.log(e)
      next(Boom.internal())
    }
  }
}
