import request from 'supertest'
import app from '~/api'
import { disConnect } from '~/api/db'
import seed from '~/test/api/seed/record'

describe('intergration user', () => {
  beforeEach(async () => {
    await seed()
  })
  describe('GET /api/record/:date', () => {
    test('response uid', async () => {
      const response = await request(app)
        .get('/api/record/2020-07-31')
        .set('Accept', 'application/json')
        .set('Cookie', ['userId=user1'])
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body._id).toBeDefined()
    })
  })

  afterAll(() => {
    disConnect()
  })
})
