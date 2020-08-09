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
    userId: 'user2'
  },
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
  },
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
    date: new Date('2020-08-01'),
    userId: 'user1'
  },
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
    date: new Date('2020-08-15'),
    userId: 'user1'
  },
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
    date: new Date('2020-08-16'),
    userId: 'user2'
  },
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
    date: new Date('2020-08-31'),
    userId: 'user1'
  },
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
    date: new Date('2020-09-01'),
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

  describe('Query Helper & Statics', () => {
    const userId = 'user1'

    describe('findByDate', () => {
      test('日付とuserIdからレコード1件を見つける', async () => {
        const date = new Date('2020-07-31')
        const result = await Record.findOne().findByDate(date, userId)
        expect(result?._id).toEqual(records[1]._id)
      })

      test('日付のレコードが存在しない場合、nullを返す', async () => {
        const date = new Date('2020-06-01')
        const result = await Record.findOne().findByDate(date, userId)
        expect(result).toBeNull()
      })

      test('日付のレコードは存在するが、userIdが異なる場合nullを返す', async () => {
        const date = new Date('2020-07-31')
        const result = await Record.findOne().findByDate(date, 'user3')
        expect(result).toBeNull()
      })
    })

    describe('findByMonth', () => {
      test('userIdが一致し、渡した日付の月のレコードをすべて返す', async () => {
        const date = new Date('2020-08-01')
        const result = await Record.find().findByMonth(date, userId)
        expect(result.length).toEqual(3)
      })

      test('月のレコードが存在しない場合、空の配列を返す', async () => {
        const date = new Date('2020-06-01')
        const result = await Record.find().findByMonth(date, userId)
        expect(result.length).toEqual(0)
      })

      test('月のレコードは存在するが、userIdが異なる場合空の配列を返す', async () => {
        const date = new Date('2020-08-01')
        const result = await Record.find().findByMonth(date, 'user3')
        expect(result.length).toEqual(0)
      })
    })

    describe('updateById', () => {
      test('更新されたレコードが返り値となる', async () => {
        const newReocrd: IRecord = {
          totalDistanceRun: 20,
          totalCaloriesBurned: 2,
          totalTimeExercising: 3600000,
          stamps: {
            arms: false,
            legs: false,
            stomach: false,
            yoga: true
          },
          userId: 'user1',
          date: new Date('2020-07-31')
        }

        const result = await Record.updateById(records[1]._id, newReocrd)
        expect(result.totalDistanceRun).toEqual(newReocrd.totalDistanceRun)
      })

      test('update時にバリデーションが機能する', async () => {
        const newReocrd: IRecord = {
          totalDistanceRun: 999,
          totalCaloriesBurned: 2,
          totalTimeExercising: 3600000,
          stamps: {
            arms: false,
            legs: false,
            stomach: false,
            yoga: true
          },
          userId: 'user1',
          date: new Date('2020-07-31')
        }

        await expect(
          Record.updateById(records[1]._id, newReocrd)
        ).rejects.toThrow(ValidationError)
      })
    })

    describe('バリデーション', () => {
      describe('totalDistanceRun', () => {
        describe('最小値は0', () => {
          test('0はOK', async () => {
            const record: IRecord = {
              totalDistanceRun: 0,
              totalCaloriesBurned: 1,
              totalTimeExercising: 1800000,
              stamps: {
                arms: false,
                legs: false,
                stomach: false,
                yoga: true
              },
              userId: 'user1',
              date: new Date('2020-10-31')
            }
            await expect(Record.create(record)).resolves.toBeDefined()
          })

          test('-1はバリデーションエラー', async () => {
            const record: IRecord = {
              totalDistanceRun: -1,
              totalCaloriesBurned: 1,
              totalTimeExercising: 1800000,
              stamps: {
                arms: false,
                legs: false,
                stomach: false,
                yoga: true
              },
              userId: 'user1',
              date: new Date('2020-10-31')
            }
            await expect(Record.create(record)).rejects.toThrow(ValidationError)
          })
        })
      })

      describe('date + userId', () => {
        test('同じdateとuserIdの組み合わせはエラー', async () => {
          const record: IRecord = {
            totalCaloriesBurned: 20,
            totalDistanceRun: 2,
            totalTimeExercising: 3600000,
            stamps: {
              arms: true,
              legs: true,
              stomach: true,
              yoga: false
            },
            date: new Date('2020-07-31'),
            userId: 'user1'
          }

          await expect(Record.create(record)).rejects.toThrow()
        })
      })
    })
  })

  afterAll(() => {
    disConnect()
  })
})
