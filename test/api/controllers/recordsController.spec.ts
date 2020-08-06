import { mockReq, mockRes } from 'sinon-express-mock'
import Boom from '@hapi/boom'
import { Record } from '~/types/record'
import recordsController from '~/api/controllers/recordsController'

let mockError = false
let mockEmpty = false
const userId = 'jfalfjafhaffj'
const mockRecords: Record[] = require('~/test/fixture/api/record/month/2020-07')

jest.mock('~/api/models/Record', () => ({
  findOne: jest.fn().mockReturnThis(),
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
  })
}))

describe('~/api/controllers/recordController', () => {
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
})
