import Express from 'express'
import Boom from '@hapi/boom'
import httpStatusCode from 'http-status-codes'
import moment from 'moment'
import { isEmpty } from 'lodash'
import isInvalidDate from '../../utils/isInvalidDate'
import { stringTime2ms as s } from '../../utils/msConversion'
import toJSON from '../../utils/toJSON'
import { Record } from '~/types/record'

// TODO mock
const records: Record[] = [
  {
    _id: '1',
    totalTimeExercising: s('00:20:02'),
    totalCaloriesBurned: 24.24,
    totalDistanceRun: 1.5,
    date: '2020-07-01T00:00:00+09:00',
    stamps: {
      arms: true,
      stomach: false,
      legs: true,
      yoga: false
    },
    userId: 'jfalfjafhaffj'
  },
  {
    _id: '2',
    totalTimeExercising: s('00:30:32'),
    totalCaloriesBurned: 32.32,
    totalDistanceRun: 4.53,
    date: '2020-07-02T00:00:00+09:00',
    stamps: {
      arms: true,
      stomach: true,
      legs: false,
      yoga: false
    },
    userId: 'jfalfjafhaffj'
  },
  {
    _id: '3',
    totalTimeExercising: s('00:10:24'),
    totalCaloriesBurned: 8.23,
    totalDistanceRun: null,
    date: '2020-07-06T00:00:00+09:00',
    stamps: {
      arms: false,
      stomach: false,
      legs: false,
      yoga: true
    },
    userId: 'jfalfjafhaffj'
  },
  {
    _id: '4',
    totalTimeExercising: s('00:21:14'),
    totalCaloriesBurned: 100.55,
    totalDistanceRun: 3.5,
    date: '2020-08-01T00:00:00+09:00',
    stamps: {
      arms: true,
      stomach: false,
      legs: false,
      yoga: true
    },
    userId: 'jfalfjafhaffj'
  }
]

export default {
  show: (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    if (isInvalidDate(req.params.date)) {
      next(Boom.badRequest('Invalid Date'))
    }
    const date = new Date(req.params.date)

    const record = records.find((record) =>
      moment(record.date).isSame(date, 'day')
    )
    if (record) {
      res.json(toJSON(record))
    }
  },
  month: (req: Express.Request, res: Express.Response) => {
    if (isInvalidDate(req.params.date)) {
      res.status(httpStatusCode.BAD_REQUEST)
      res.json({ message: 'Invalid Date' })
      return
    }

    const date = new Date(req.params.date)
    const monthRecord = records.filter((record) =>
      moment(record.date).isSame(date, 'months')
    )

    if (!isEmpty(monthRecord)) {
      res.json(monthRecord.map((r) => toJSON(r)))
    } else {
      res.json({})
    }
  },
  create: (req: Express.Request, res: Express.Response) => {
    const record = req.body
    console.log(record)
    // TODO とりあえずオウム返し
    res.json(record)
  },
  update: (req: Express.Request, res: Express.Response) => {
    const record = req.body
    console.log(record)
    // TODO とりあえずオウム返し
    res.json(record)
  },
  delete: (req: Express.Request, res: Express.Response) => {
    const { id } = req.params
    console.log(id)
    res.json({})
  }
}
