import { mockReq, mockRes } from 'sinon-express-mock'
import { cloneDeep } from 'lodash'
import getCallError from '~/utils/getCallError'
import { Record } from '~/types/record'
import recordsController from '~/api/controllers/recordsController'

let mockError = false
let mockEmpty = false
const userId = 'jfalfjafhaffj'
const mockRecords: Record[] = require('~/test/fixture/api/record/month/2020-07')

jest.mock('~/api/models/Record', () => ({
  findOne: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  findByDate: jest.fn((date: Date, userId: string) => {
    if (mockError) {
      return Promise.reject('mock error')
    }
    if (mockEmpty) {
      return Promise.resolve(null)
    }
    return Promise.resolve(mockRecords[0])
  }),
  findByMonth: jest.fn((date: Date, userId: string) => {
    if (mockError) {
      return Promise.reject('mock error')
    }
    if (mockEmpty) {
      return Promise.resolve([])
    }
    return Promise.resolve(mockRecords)
  }),
  create: jest.fn((record: Record) => {
    if (mockError) {
      return Promise.resolve('mock error')
    }

    return { ...record, _id: '12345' }
  })
}))

describe('~/api/controllers/recordController', () => {
  beforeEach(() => {
    mockError = false
    mockEmpty = false
  })

  const res = mockRes({
    locals: { userId }
  })
  const next = jest.fn()

  describe('show action', () => {
    describe('正常系', () => {
      const req = mockReq({
        params: {
          date: '2020-08-01'
        }
      })

      test('日付とuserIdを受け取りレコードを1件返す', async () => {
        await recordsController.show(req, res, next)

        expect(res.status.calledWith(200)).toBeTruthy()
        expect(res.json.calledWith(mockRecords[0])).toBeTruthy()
      })

      test('レコードが存在しないとき、空のオブジェクトを返す', async () => {
        mockEmpty = true
        await recordsController.show(req, res, next)

        expect(res.status.calledWith(200)).toBeTruthy()
        expect(res.json.calledWith({})).toBeTruthy()
      })
    })
  })

  describe('異常系', () => {
    describe('パラメータが不正', () => {
      const req = mockReq({
        params: {
          date: '2020年8月1日'
        }
      })

      test('req.params.dateが日付型に変換できない場合、400エラー', async () => {
        await recordsController.show(req, res, next)

        expect(next).toHaveBeenCalled()
        const { output } = getCallError(next)
        expect(output.statusCode).toEqual(400)
        expect(output.payload.message).toEqual('Invalid Date')
      })
    })

    describe('dbエラー', () => {
      const req = mockReq({
        params: {
          date: '2020-08-01'
        }
      })

      test('500エラー', async () => {
        mockError = true
        await recordsController.show(req, res, next)

        expect(next).toHaveBeenCalled()
        const { output } = getCallError(next)
        expect(output.statusCode).toEqual(500)
      })
    })
  })

  describe('month action', () => {
    describe('正常系', () => {
      const req = mockReq({
        params: {
          date: '2020-08-01'
        }
      })

      test('日付とuserIdを受け取り日付の月のレコードをすべて返す', async () => {
        await recordsController.month(req, res, next)

        expect(res.status.calledWith(200)).toBeTruthy()
        expect(res.json.calledWith(mockRecords)).toBeTruthy()
      })

      test('レコードが存在しないとき、空のオブジェクトを返す', async () => {
        mockEmpty = true
        await recordsController.month(req, res, next)

        expect(res.status.calledWith(200)).toBeTruthy()
        expect(res.json.calledWith({})).toBeTruthy()
      })
    })

    describe('異常系', () => {
      describe('パラメータが不正', () => {
        const req = mockReq({
          params: {
            date: '2020年8月1日'
          }
        })

        test('req.params.dateが日付型に変換できない場合、400エラー', async () => {
          await recordsController.month(req, res, next)

          expect(next).toHaveBeenCalled()
          const { output } = getCallError(next)
          expect(output.statusCode).toEqual(400)
          expect(output.payload.message).toEqual('Invalid Date')
        })
      })

      describe('dbエラー', () => {
        const req = mockReq({
          params: {
            date: '2020-08-01'
          }
        })

        test('500エラー', async () => {
          mockError = true
          await recordsController.month(req, res, next)

          expect(next).toHaveBeenCalled()
          const { output } = getCallError(next)
          expect(output.statusCode).toEqual(500)
        })
      })
    })
  })

  describe('create action', () => {
    describe('正常系', () => {
      const reqRecord: Record = {
        _id: '',
        totalCaloriesBurned: 20,
        totalDistanceRun: 1,
        totalTimeExercising: 1800000,
        date: '2020-08-01',
        stamps: {
          arms: true,
          legs: true,
          stomach: true,
          yoga: true
        },
        userId: ''
      }
      const req = mockReq({
        body: reqRecord
      })

      describe('レコードを作成して返す', () => {
        test('ステータスコードは201', async () => {
          await recordsController.create(req, res, next)
          expect(res.status.calledWith(201)).toBeTruthy()
        })

        test('リクエストで渡したプロパティがそのまま返される', async () => {
          await recordsController.create(req, res, next)
          const resRecord = cloneDeep(reqRecord)
          resRecord._id = '12345'
          resRecord.userId = userId
          expect(res.json.calledWith(resRecord)).toBeTruthy()
        })
      })
    })

    describe('異常系', () => {
      const reqRecord: Record = {
        _id: '',
        totalCaloriesBurned: 20,
        totalDistanceRun: 1,
        totalTimeExercising: 1800000,
        date: '2020-08-01',
        stamps: {
          arms: true,
          legs: true,
          stomach: true,
          yoga: true
        },
        userId: ''
      }
      const req = mockReq({
        body: reqRecord
      })
      describe('dbエラー', () => {
        test('500エラー', async () => {
          await recordsController.create(req, res, next)

          expect(next).toHaveBeenCalled()
          const { output } = getCallError(next)
          expect(output.statusCode).toEqual(500)
        })
      })
    })
  })
})
