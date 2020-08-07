import { mockReq, mockRes } from 'sinon-express-mock'
import usersConrtoller from '~/api/controllers/usersController'
import getCallError from '~/utils/getCallError'
import { LoginUser } from '~/types/auth'

let mockError = false

interface Request {
  body: {
    user: LoginUser
  }
}
jest.mock('~/api/models/User', () => ({
  findOne: jest.fn().mockReturnThis(),
  findOrCreate: jest.fn((user: LoginUser) => {
    if (mockError) {
      throw new Error('mock error')
    }
    return { _id: '12345', ...user }
  })
}))

describe('~/api/controllers/userController', () => {
  const request: Request = {
    body: {
      user: {
        username: 'test',
        strategy: 'google',
        identifier: '12345',
        email: 'aaa@example.com',
        photoURL: 'http://example.com'
      }
    }
  }
  const req = mockReq(request)
  const res = mockRes()
  const next = jest.fn()

  describe('正常系', () => {
    test('uidが返される', async () => {
      await usersConrtoller.create(req, res, next)

      expect(res.status.calledWith(200)).toBeTruthy()
      expect(res.json.calledWith({ uid: '12345' })).toBeTruthy()
    })
  })

  describe('異常系', () => {
    test('エラーが発生したとき、nextが呼ばれる', async () => {
      mockError = true
      await usersConrtoller.create(req, res, next)

      expect(next).toHaveBeenCalled()
      const { output } = getCallError(next)
      expect(output.statusCode).toEqual(500)
    })
  })
})
