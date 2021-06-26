import { mockReq, mockRes } from 'sinon-express-mock'
import usersConrtoller from '~/api/controllers/usersController'
import getCallError from '~/utils/getCallError'
import { LoginUser } from '~/types/auth'

let mockError = false
const user = {
  username: 'test',
  strategy: 'google',
  identifier: '12345',
  email: 'aaa@example.com',
  photoURL: 'http://example.com'
}

interface Request {
  body: {
    user: LoginUser
  }
}
jest.mock('~/api/models/User', () => ({
  findOrCreate: jest.fn((user: LoginUser) => {
    if (mockError) {
      throw new Error('mock error')
    }
    return { _id: '12345', ...user }
  }),
  update: jest.fn((user: LoginUser) => {
    if (mockError) {
      throw new Error('mock error')
    }
    return { _id: '12345', ...user }
  })
}))

describe('~/api/controllers/userController', () => {
  const request: Request = {
    body: {
      user
    }
  }
  const req = mockReq(request)
  const res = mockRes()
  const next = jest.fn()

  describe('create', () => {
    describe('正常系', () => {
      test('ユーザーが返される', async () => {
        await usersConrtoller.create(req, res, next)

        expect(res.status.calledWith(200)).toBeTruthy()
        expect(res.json.calledWith({ _id: '12345', ...user })).toBeTruthy()
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

  describe('update', () => {
    describe('正常系', () => {
      test('ユーザーが返される', async () => {
        await usersConrtoller.update(req, res, next)

        expect(res.status.calledWith(200)).toBeTruthy()
        expect(res.json.calledWith({ _id: '12345', ...user })).toBeTruthy()
      })
    })

    describe('異常系', () => {
      test('エラーが発生したとき、nextが呼ばれる', async () => {
        mockError = true
        await usersConrtoller.update(req, res, next)

        expect(next).toHaveBeenCalled()
        const { output } = getCallError(next)
        expect(output.statusCode).toEqual(500)
      })
    })
  })
})
