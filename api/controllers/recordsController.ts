import Express, { response } from 'express'
import Boom from '@hapi/boom'
import httpStatusCode from 'http-status-codes'
import { isEmpty } from 'lodash'
import Record from '../models/Record'
import isInvalidDate from '../../utils/isInvalidDate'

export default {
  show: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    if (isInvalidDate(req.params.date)) {
      next(Boom.badRequest('Invalid Date'))
    }
    const date = new Date(req.params.date)
    const userId: string = res.locals.userId
    try {
      const record = await Record.findOne().findByDate(date, userId)
      if (record) {
        res.status(httpStatusCode.OK).json(record)
      } else {
        res.status(httpStatusCode.OK).json({})
      }
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
      next(Boom.badRequest('Invalid Date'))
    }

    const date = new Date(req.params.date)
    const userId: string = res.locals.userId

    try {
      const records = await Record.find().findByMonth(date, userId)
      if (!isEmpty(records)) {
        res.status(httpStatusCode.OK).json(records)
      } else {
        res.json({})
      }
    } catch (e) {
      next(Boom.internal())
    }
  },
  create: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    try {
      const record = req.body
      delete record._id
      record.userId = res.locals.userId
      const result = await Record.create(req.body)
      res.status(httpStatusCode.CREATED).json(result)
    } catch (e) {
      next(Boom.internal())
    }
  },
  update: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { id } = req.params
    const record = req.body
    const userId = res.locals.userId
    if (record.userId !== userId) {
      next(Boom.forbidden())
    }
    try {
      const result = await Record.updateById(id, record)
      res.status(httpStatusCode.OK).json(result)
    } catch (e) {
      next(Boom.internal())
    }
  },
  delete: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { id } = req.params
    try {
      await Record.findByIdAndDelete(id)
      res.status(httpStatusCode.NO_CONTENT).json({})
    } catch (e) {
      next(Boom.internal())
    }
  }
}
