import Express from 'express'
import Boom from '@hapi/boom'
import httpStatusCode from 'http-status-codes'
import { isEmpty } from 'lodash'
import { parse } from 'json2csv'
import Record from '../models/Record'
import AppUser from '../models/User'
import Timeline from '../models/Timeline'
import isInvalidDate from '../../utils/isInvalidDate'
import { createPagenationOptions } from '../utils/createPaginationOptions'

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
      const { userId } = res.locals
      delete record._id
      record.userId = userId
      const user = await AppUser.findById(userId).exec()
      const result = await Record.create(req.body)
      if (user && user.timeline) {
        await Timeline.create({
          user: user._id,
          record: result._id,
          likes: []
        })
      }
      res.status(httpStatusCode.CREATED).json(result)
    } catch (e) {
      console.log(e)
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
  },
  deleteAll: async (
    _req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const userId = res.locals.userId
    try {
      await Record.deleteMany({ userId })
      res.status(httpStatusCode.NO_CONTENT).json({})
    } catch (e) {
      next(Boom.internal())
    }
  },
  list: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const userId = res.locals.userId
    const options = createPagenationOptions(req)
    try {
      const records = await Record.paginate({ userId }, options)
      if (!isEmpty(records)) {
        res.status(httpStatusCode.OK).json(records)
      } else {
        res.json({})
      }
    } catch (e) {
      next(Boom.internal())
    }
  },
  csv: async (
    _req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const userId = res.locals.userId
    try {
      res.setHeader('Content-disposition', 'attachment; filename=data.csv')
      res.setHeader('Content-Type', 'text/csv; charset=UTF-8')
      const fields = [
        '活動時間(ms)',
        '合計消費カロリー(kcal)',
        '合計走行距離(km)',
        '日付'
      ]
      const records = await Record.find({ userId })
      const coverted = records.map((record) => {
        return {
          [fields[0]]: record.totalTimeExercising,
          [fields[1]]: record.totalCaloriesBurned,
          [fields[2]]: record.totalDistanceRun,
          [fields[3]]: record.date
        }
      })
      const data = parse(coverted, { fields, withBOM: true })
      res.status(httpStatusCode.OK).send(data)
    } catch (e) {
      next(Boom.internal())
    }
  }
}
