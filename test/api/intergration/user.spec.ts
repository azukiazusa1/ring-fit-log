import request from 'supertest'
import app from '~/api/'
import { disConnect } from '~/api/db'
import { LoginUser } from '~/types/auth'

describe('intergration user', () => {
  describe('POST /api/user', () => {
    test('response uid', async () => {
      const user: LoginUser = {
        username: 'username',
        strategy: 'github',
        identifier: '12345',
        email: 'aaa@example.com',
        photoURL: 'aaa'
      }

      const response = await request(app)
        .post('/api/users')
        .send({ user })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.uid).toBeDefined()
    })
  })

  afterAll(() => {
    disConnect()
  })
})
