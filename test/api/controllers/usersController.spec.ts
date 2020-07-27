import { mockReq, mockRes } from 'sinon-express-mock'
import AppUser from '~/api/models/User'
import usersConrtoller from '~/api/controllers/usersController'
import { LoginUser } from '~/types/auth'

const findOne = jest.fn()

let mockError = false
jest.mock('@hapi/boom')
jest.mock('~/api/models/User', () => ({
  findOne: jest.fn(() => {
    return AppUser
  }),
  findOrCreate: jest.fn((user: LoginUser) => {
    console.log(user)
    return { uid: '12345', ...user }
  })
}))

const next = jest.fn().mockReturnThis()

describe('~/api/controllers/userController', () => {
  describe('正常系', () => {
    test('uidが返される', async () => {
      const request = {
        body: {
          user: {
            username: 'test',
            storategy: 'google',
            identifier: '12345',
            emil: 'aaa@example.com',
            photoURL: 'http://example.com'
          }
        }
      }

      const req = mockReq(request)
      const res = mockRes()

      await usersConrtoller.create(req, res, next)

      expect(res.status.calledWith(200)).toBeTruthy()
    })
  })
})
