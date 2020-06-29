import Express from 'express'
import httpStatusCode from 'http-status-codes'
import moment from 'moment'
import isInvalidDate from '../../utils/isInvalidDate'
import formatResponse from '../../utils/formatResponse'
import { Record } from '~/types/record'

// TODO mock
const records: Record[] = [
  {
    totalTimeExercising: {
      hour: '00',
      minute: '24',
      second: '24'
    },
    totalCaloriesBurned: 24.24,
    totalDistanceRun: 1.5,
    date: new Date('2020-7-1'),
    stamps: {
      arms: true,
      stomach: false,
      legs: true,
      yoga: false
    }
  }
]

export default {
  show: (req: Express.Request, res: Express.Response) => {
    if (isInvalidDate(req.params.date)) {
      res.status(httpStatusCode.BAD_REQUEST)
      res.json({ message: 'Invalid Date' })
      return
    }
    const date = new Date(req.params.date)

    const record = records.find((record) =>
      moment(record.date).isSame(date, 'day')
    )
    if (record) {
      res.json(formatResponse(record))
    } else {
      res.json({})
    }
  }
}
