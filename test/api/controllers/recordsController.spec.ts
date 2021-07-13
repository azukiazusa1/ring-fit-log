import { mockReq, mockRes } from 'sinon-express-mock'
import { cloneDeep } from 'lodash'
import getCallError from '~/utils/getCallError'
import { Record } from '~/types/record'
import recordsController from '~/api/controllers/recordsController'
import Timeline from '~/api/models/Timeline'

let mockError = false
let mockEmpty = false
let mockTimeline = false
const userId = '5f24196497a4c3076ab1e757'
const mockRecords: Record[] = require('~/test/fixture/api/record/month/2020-07')
const user = {
  _id: '5f24196497a4c3076ab1e757',
  username: 'test',
  strategy: 'google',
  identifier: '12345',
  email: 'aaa@example.com',
  photoURL: 'http://example.com'
}

jest.mock('~/api/models/User', () => ({
  findById: jest.fn((_) => {
    return {
      exec() {
        return Promise.resolve({ ...user, timeline: mockTimeline })
      }
    }
  })
}))

jest.mock('~/api/models/Timeline', () => ({
  create: jest.fn()
}))

jest.mock('~/api/models/Record', () => ({
  findOne: jest.fn().mockReturnThis(),
  find: jest.fn().mockReturnThis(),
  findByDate: jest.fn((_date: Date, _userId: string) => {
    if (mockError) {
      return Promise.reject(new Error('mock error'))
    }
    if (mockEmpty) {
      return Promise.resolve(null)
    }
    return Promise.resolve(mockRecords[0])
  }),
  findByMonth: jest.fn((_date: Date, _userId: string) => {
    if (mockError) {
      return Promise.reject(new Error('mock error'))
    }
    if (mockEmpty) {
      return Promise.resolve([])
    }
    return Promise.resolve(mockRecords)
  }),
  create: jest.fn((record: Record) => {
    if (mockError) {
      return Promise.reject(new Error('mock error'))
    }

    return Promise.resolve({ ...record, _id: '12345' })
  }),
  updateById: jest.fn((_id: string, record: Record) => {
    if (mockError) {
      return Promise.reject(new Error('mock error'))
    }
    return Promise.resolve(record)
  }),
  findByIdAndDelete: jest.fn((_id: string) => {
    if (mockError) {
      return Promise.reject(new Error('mock error'))
    }
    return Promise.resolve()
  })
}))

describe('~/api/controllers/recordController', () => {
  beforeEach(() => {
    mockError = false
    mockEmpty = false
    mockTimeline = false
  })

  afterEach(() => {
    ;(Timeline as any).create.mockClear()
  })

  describe('show action', () => {
    describe('正常系', () => {
      const req = mockReq({
        params: {
          date: '2020-08-01'
        }
      })

      const res = mockRes({
        locals: { userId }
      })
      const next = jest.fn()

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

      const res = mockRes({
        locals: { userId }
      })
      const next = jest.fn()

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

      const res = mockRes({
        locals: { userId }
      })
      const next = jest.fn()

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

      const res = mockRes({
        locals: { userId }
      })
      const next = jest.fn()

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

        const res = mockRes({
          locals: { userId }
        })
        const next = jest.fn()

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

        const res = mockRes({
          locals: { userId }
        })
        const next = jest.fn()

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
        comment: '',
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

      const res = mockRes({
        locals: { userId }
      })
      const next = jest.fn()

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

        test('userのtimelineがtrueのとき、Timelineを作成する', async () => {
          mockTimeline = true
          await recordsController.create(req, res, next)

          expect(Timeline.create).toHaveBeenCalledWith({
            user: userId,
            record: '12345',
            likes: []
          })
        })

        test('userのtimelineがfalseのとき、Timelineを作成する', async () => {
          await recordsController.create(req, res, next)

          expect(Timeline.create).not.toHaveBeenCalled()
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
        comment: '',
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

      const res = mockRes({
        locals: { userId }
      })
      const next = jest.fn()

      describe('dbエラー', () => {
        test('500エラー', async () => {
          mockError = true
          await recordsController.create(req, res, next)

          expect(next).toHaveBeenCalled()
          const { output } = getCallError(next)
          expect(output.statusCode).toEqual(500)
        })
      })
    })
  })

  describe('update action', () => {
    describe('正常系', () => {
      const id = '12345'
      const reqRecord: Record = {
        _id: id,
        totalCaloriesBurned: 20,
        totalDistanceRun: 1,
        totalTimeExercising: 1800000,
        date: '2020-08-01',
        comment: '',
        stamps: {
          arms: true,
          legs: true,
          stomach: true,
          yoga: true
        },
        userId
      }
      const req = mockReq({
        body: reqRecord,
        params: { id }
      })

      const res = mockRes({
        locals: { userId }
      })
      const next = jest.fn()

      describe('idでレコードを見つけてupdateする', () => {
        test('ステータスコードとレスポンスが正しいか', async () => {
          await recordsController.update(req, res, next)

          expect(res.status.calledWith(200)).toBeTruthy()
          expect(res.json.calledWith(reqRecord)).toBeTruthy()
        })
      })
    })

    describe('異常系', () => {
      describe('レコードのuserIdとcookieのuserIdが一致しない', () => {
        const id = '12345'
        const reqRecord: Record = {
          _id: id,
          totalCaloriesBurned: 20,
          totalDistanceRun: 1,
          totalTimeExercising: 1800000,
          date: '2020-08-01',
          comment: '',
          stamps: {
            arms: true,
            legs: true,
            stomach: true,
            yoga: true
          },
          userId: 'aaaaa'
        }
        const req = mockReq({
          body: reqRecord,
          params: { id }
        })
        const res = mockRes({
          locals: { userId }
        })
        const next = jest.fn()

        test('403エラー', async () => {
          await recordsController.update(req, res, next)

          expect(next).toHaveBeenCalled()
          const { output } = getCallError(next)
          expect(output.statusCode).toEqual(403)
        })
      })
    })

    describe('dbエラー', () => {
      const id = '12345'
      const reqRecord: Record = {
        _id: id,
        totalCaloriesBurned: 20,
        totalDistanceRun: 1,
        totalTimeExercising: 1800000,
        date: '2020-08-01',
        comment: '',
        stamps: {
          arms: true,
          legs: true,
          stomach: true,
          yoga: true
        },
        userId
      }
      const req = mockReq({
        body: reqRecord,
        params: { id }
      })
      const res = mockRes({
        locals: { userId }
      })
      const next = jest.fn()
      test('500エラー', async () => {
        mockError = true
        await recordsController.update(req, res, next)

        expect(next).toHaveBeenCalled()
        const { output } = getCallError(next)
        expect(output.statusCode).toEqual(500)
      })
    })
  })

  describe('delete action', () => {
    describe('正常系', () => {
      describe('idを渡してレコードを削除する', () => {
        const req = mockReq({
          params: { id: '12345' }
        })
        const res = mockRes({
          locals: { userId }
        })
        const next = jest.fn()
        test('レスポンスが正しいかどうか', async () => {
          await recordsController.delete(req, res, next)

          expect(res.status.calledWith(204)).toBeTruthy()
          expect(res.json.calledWith({})).toBeTruthy()
        })
      })
    })

    describe('異常系', () => {
      describe('dbエラー', () => {
        const req = mockReq({
          params: { id: '12345' }
        })
        const res = mockRes({
          locals: { userId }
        })
        const next = jest.fn()

        test('500エラー', async () => {
          mockError = true
          await recordsController.delete(req, res, next)

          expect(next).toHaveBeenCalled()
          const { output } = getCallError(next)
          expect(output.statusCode).toEqual(500)
        })
      })
    })
  })
})
