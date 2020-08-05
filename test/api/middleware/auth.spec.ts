import { mockReq, mockRes } from 'sinon-express-mock'
import auth from '~/api/middleware/auth'

interface Request {
  cookies: {
    userId?: string
  }
}

describe('~/api/middleware/auth', () => {
  describe('正常系', () => {
    test('cookieのuserIdを取り出す', () => {
      const userId = '12345'
      const request: Request = {
        cookies: { userId }
      }
      const req = mockReq(request)
      const res = mockRes()
      const next = jest.fn()

      auth(req, res, next)

      expect(res.locals.userId).toEqual(userId)
      expect(next).toHaveBeenCalled()
    })
  })
})
