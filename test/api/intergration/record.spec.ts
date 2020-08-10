import request from 'supertest'
import app from '~/api'
import { RecordDoc } from '~/api/models/Record'
import { disConnect } from '~/api/db'
import seed from '~/test/api/seed/record'
import { IRecord } from '~/types/record'

describe('intergration user', () => {
  let records: RecordDoc[]
  beforeEach(async () => {
    records = await seed()
  })
  describe('GET /api/record/:date', () => {
    test('respond with json', async () => {
      const response = await request(app)
        .get('/api/record/2020-07-31')
        .set('Accept', 'application/json')
        .set('Cookie', ['userId=user1'])
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body._id).toBeDefined()
    })

    test('paramsパス間違え 400エラー', async () => {
      await request(app)
        .get('/api/record/abc')
        .set('Accept', 'application/json')
        .set('Cookie', ['userId=user1'])
        .expect('Content-Type', /json/)
        .expect(400)
    })

    test('クッキーなし 401エラー', async () => {
      await request(app)
        .get('/api/record/2020-07-31')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
    })
  })

  describe('GET /api/record/month/date', () => {
    test('respond with json', async () => {
      const response = await request(app)
        .get('/api/record/month/2020-08-01')
        .set('Accept', 'application/json')
        .set('Cookie', ['userId=user1'])
        .expect('Content-Type', /json/)
        .expect(200)

      expect(Array.isArray(response.body)).toBeTruthy()
    })

    test('paramsパス間違え 400エラー', async () => {
      await request(app)
        .get('/api/record/month/abc')
        .set('Accept', 'application/json')
        .set('Cookie', ['userId=user1'])
        .expect('Content-Type', /json/)
        .expect(400)
    })

    test('クッキーなし 401エラー', async () => {
      await request(app)
        .get('/api/record/month/2020-07-31')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
    })
  })

  describe('POST /api/record', () => {
    const record: IRecord = {
      totalCaloriesBurned: 20,
      totalDistanceRun: 1,
      totalTimeExercising: 1800000,
      stamps: {
        arms: true,
        legs: true,
        stomach: true,
        yoga: true
      },
      date: new Date('2020-08-11'),
      userId: ''
    }
    test('respond with json', async () => {
      const response = await request(app)
        .post('/api/record')
        .send(record)
        .set('Accept', 'application/json')
        .set('Cookie', ['userId=user1'])
        .expect('Content-Type', /json/)
        .expect(201)

      expect(response.body._id).toBeDefined()
    })

    test('バリデーションエラー 500エラー', async () => {
      const invalidRecord: IRecord = {
        totalCaloriesBurned: 20,
        totalDistanceRun: 1,
        totalTimeExercising: 1800000,
        stamps: {
          arms: true,
          legs: true,
          stomach: true,
          yoga: true
        },
        date: '',
        userId: ''
      }

      await request(app)
        .post('/api/record')
        .send(invalidRecord)
        .set('Accept', 'application/json')
        .set('Cookie', ['userId=user1'])
        .expect('Content-Type', /json/)
        .expect(500)
    })

    test('クッキーなし 401エラー', async () => {
      await request(app)
        .post('/api/record')
        .send(record)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
    })
  })

  describe('PUT /api/record/:id', () => {
    const record: IRecord = {
      totalCaloriesBurned: 40,
      totalDistanceRun: 1,
      totalTimeExercising: 1800000,
      stamps: {
        arms: true,
        legs: true,
        stomach: true,
        yoga: true
      },
      date: new Date('2020-07-31'),
      userId: 'user1'
    }
    test('respond with json', async () => {
      const response = await request(app)
        .put(`/api/record/${records[1]._id}`)
        .send(record)
        .set('Accept', 'application/json')
        .set('Cookie', ['userId=user1'])
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body.totalCaloriesBurned).toEqual(
        record.totalCaloriesBurned
      )
    })

    test('バリデーションエラー 500エラー', async () => {
      const invalidRecord: IRecord = {
        totalCaloriesBurned: 20,
        totalDistanceRun: 1,
        totalTimeExercising: 1800000,
        stamps: {
          arms: true,
          legs: true,
          stomach: true,
          yoga: true
        },
        date: '',
        userId: 'user1'
      }

      await request(app)
        .put(`/api/record/${records[1]._id}`)
        .send(invalidRecord)
        .set('Accept', 'application/json')
        .set('Cookie', ['userId=user1'])
        .expect('Content-Type', /json/)
        .expect(500)
    })

    test('クッキのuserIdと一致しない 401エラー', async () => {
      await request(app)
        .put(`/api/record/${records[1]._id}`)
        .send(record)
        .set('Accept', 'application/json')
        .set('Cookie', ['userId=user3'])
        .expect('Content-Type', /json/)
        .expect(403)
    })

    test('クッキーなし 401エラー', async () => {
      await request(app)
        .put(`/api/record/${records[1]._id}`)
        .send(record)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
    })
  })

  describe('DELETE /api/record/:id', () => {
    test('no content', async () => {
      const response = await request(app)
        .delete(`/api/record/${records[1]._id}`)
        .set('Accept', 'application/json')
        .set('Cookie', ['userId=user1'])
        .expect(204)

      expect(response.body).toEqual({})
    })

    test('クッキーなし 401エラー', async () => {
      await request(app)
        .delete(`/api/record/${records[1]._id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
    })
  })

  afterAll(() => {
    disConnect()
  })
})
