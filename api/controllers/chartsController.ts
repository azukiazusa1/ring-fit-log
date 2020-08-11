import Express from 'express'
import Chart from '../models/Chart'
import Boom from '@hapi/boom'
import httpStatusCode from 'http-status-codes'
import isInvalidDate from '../../utils/isInvalidDate'

export default {
  week: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    if (isInvalidDate(req.params.date)) {
      next(Boom.badRequest())
    }

    const date = new Date(req.params.date)
    const userId: string = res.locals.userId
    const chart = new Chart(date, userId)

    try {
      const chartData = await chart.week()
      res.status(httpStatusCode.OK).json(chartData)
    } catch (e) {
      next(Boom.internal())
    }
  },
  month: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    if (isInvalidDate(req.params.date)) {
      next(Boom.badRequest())
    }

    const date = new Date(req.params.date)
    const userId: string = res.locals.userId
    const chart = new Chart(date, userId)

    try {
      const chartData = await chart.month()
      res.status(httpStatusCode.OK).json(chartData)
    } catch (e) {
      next(Boom.internal())
    }
  },
  quarter: (_req: Express.Request, res: Express.Response) => {
    res.json({})
  }
}
