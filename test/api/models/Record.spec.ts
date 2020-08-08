import { Error } from 'mongoose'
import moment from 'moment'
import Record, { RecordDoc } from '~/api/models/Record'
import { IRecord } from '~/types/record'
import { connect, disConnect } from '~/api/db'
import { isEqual } from 'lodash'

const { ValidationError } = Error

const records: any[] = [
  {
    totalCaloriesBurned: 100,
    totalDistanceRun: 1,
    totalTimeExercising: 1800000,
    stamps: {
      arms: true,
      legs: true,
      stomach: true,
      yoga: false
    },
    date: new Date('2020-07-31'),
    userId: 'user1'
  }
]

describe('~/api/models/Record', () => {
  beforeAll(async () => {
    await connect()
  })
  beforeEach(async () => {
    await Record.deleteMany({})
    await Record.collection.insertMany(records)
  })

  describe('findByDate', () => {
    test('日付とuserIdからレコード1件を見つける', async () => {
      const date = new Date('2020-07-31')
      const userId = 'user1'
      const result = await Record.findOne().findByDate(date, userId)
      expect(result?._id).toEqual(records[0]._id)
    })
  })

  afterAll(() => {
    disConnect()
  })
})
