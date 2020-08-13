import Express from 'express'
import Chart from '../models/Chart'
import Boom from '@hapi/boom'
import httpStatusCode from 'http-status-codes'
import isInvalidDate from '../../utils/isInvalidDate'

export default {
  hangleRequest: (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    if (isInvalidDate(req.params.date)) {
      next(Boom.badRequest())
    }

    const date = new Date(req.params.date)
    const userId: string = res.locals.userId
    res.locals.chart = new Chart(date, userId)
    next()
  },
  week: async (
    _req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const chart: Chart = res.locals.chart

    try {
      const chartData = await chart.week()
      res.status(httpStatusCode.OK).json(chartData)
    } catch (e) {
      next(Boom.internal())
    }
  },
  month: async (
    _req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const chart: Chart = res.locals.chart

    try {
      const chartData = await chart.month()
      res.status(httpStatusCode.OK).json(chartData)
    } catch (e) {
      next(Boom.internal())
    }
  },
  quarter: async (
    _req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const chart: Chart = res.locals.chart

    try {
      const chartData = await chart.quarter()
      res.status(httpStatusCode.OK).json(chartData)
    } catch (e) {
      console.log(e)
      next(Boom.internal())
    }
  }
}
