import { mockReq, mockRes } from 'sinon-express-mock'
import timelinesController from '~/api/controllers/timelinesController'
import Timeline from '~/api/models/Timeline'
import getCallError from '~/utils/getCallError'

let mockError = false

jest.mock('~/api/models/Timeline', () => {
  const actual = jest.requireActual('~/api/models/Timeline')

  return {
    ...actual,
    paginate: jest.fn((_: any) => {
      if (mockError) {
        return Promise.reject(new Error('mock error'))
      }

      return Promise.resolve({
        totalDocs: 13,
        limit: 10,
        page: 1,
        nextPage: 2,
        prevPage: null,
        hasNextPage: true,
        hasPrevPage: false,
        totalPages: 2,
        pagingCounter: 1,
        docs: [
          {
            record: {
              _id: '60ec0b4ce31dee00040e07e9',
              comment: 'ワイドスクワット3000回達成！',
              totalDistanceRun: 0.39,
              totalCaloriesBurned: 130.32,
              totalTimeExercising: 1963000,
              date: '2021-07-06T14:47:15.000Z',
              stamps: {
                arms: false,
                stomach: false,
                legs: false,
                yoga: false
              },
              createdAt: '2021-07-06T14:48:21.068Z',
              updatedAt: '2021-07-06T14:50:32.727Z'
            },
            user: {
              _id: 'f24196497a4c3076ab1e757',
              username: 'user1',
              photoURL: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
            },
            _id: '60ea4f18005d0c7f927d953c',
            createdAt: '2021-07-06T14:48:21.068Z',
            updatedAt: '2021-07-06T14:50:32.727Z',
            likes: [
              '5f24196497a4c3076ab1e757',
              '5f24196497a4c3076ab1e758',
              '5f24196497a4c3076ab1e759'
            ]
          }
        ]
      })
    }),
    toggleLike: jest.fn((_id: string, _userId: string) => {
      if (mockError) {
        return Promise.reject(new Error('mock error'))
      }
      return Promise.resolve()
    })
  }
})

describe('~/api/controllers/timelineController', () => {
  beforeEach(() => {
    mockError = false
  })

  describe('show action', () => {
    describe('正常系', () => {
      const next = jest.fn()

      test('pageとlimitを受け取りタイムラインの一覧を返す', async () => {
        const req = mockReq({
          query: {
            page: 1,
            limit: 10
          }
        })

        const res = mockRes({
          locals: { userId: '5f24196497a4c3076ab1e757' }
        })

        await timelinesController.list(req, res, next)

        expect(Timeline.paginate).toHaveBeenCalledWith(
          {},
          {
            page: 1,
            limit: 10,
            sort: { createdAt: -1 }
          }
        )

        expect(res.status.calledWith(200)).toBeTruthy()
        expect(
          res.json.calledWith({
            totalDocs: 13,
            limit: 10,
            page: 1,
            nextPage: 2,
            prevPage: null,
            hasNextPage: true,
            hasPrevPage: false,
            totalPages: 2,
            pagingCounter: 1,
            docs: [
              {
                _id: '60ea4f18005d0c7f927d953c',
                createdAt: '2021-07-06T14:48:21.068Z',
                updatedAt: '2021-07-06T14:50:32.727Z',
                record: {
                  _id: '60ec0b4ce31dee00040e07e9',
                  comment: 'ワイドスクワット3000回達成！',
                  totalDistanceRun: 0.39,
                  totalCaloriesBurned: 130.32,
                  totalTimeExercising: 1963000,
                  date: '2021-07-06T14:47:15.000Z',
                  stamps: {
                    arms: false,
                    stomach: false,
                    legs: false,
                    yoga: false
                  },
                  createdAt: '2021-07-06T14:48:21.068Z',
                  updatedAt: '2021-07-06T14:50:32.727Z'
                },
                user: {
                  username: 'user1',
                  photoURL: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                },
                me: false,
                likeCount: 3,
                isLiked: true
              }
            ]
          })
        ).toBeTruthy()
      })

      test('リクエストのpageとlimitをクエリオプションに渡す', async () => {
        const req = mockReq({
          query: {
            page: 3,
            limit: 30
          }
        })

        const res = mockRes({
          locals: { userId: '5f24196497a4c3076ab1e757' }
        })

        await timelinesController.list(req, res, next)

        expect(Timeline.paginate).toHaveBeenCalledWith(
          {},
          {
            page: 3,
            limit: 30,
            sort: { createdAt: -1 }
          }
        )

        expect(res.status.calledWith(200)).toBeTruthy()
      })
    })
  })

  describe('異常系', () => {
    const req = mockReq({
      query: {
        page: 1,
        limit: 10
      }
    })

    const res = mockRes({
      locals: { userId: '5f24196497a4c3076ab1e757' }
    })

    const next = jest.fn()

    test('dbエラー', async () => {
      mockError = true
      await timelinesController.list(req, res, next)

      expect(next).toHaveBeenCalled()
      const { output } = getCallError(next)
      expect(output.statusCode).toEqual(500)
    })
  })

  describe('like action', () => {
    describe('正常系', () => {
      const next = jest.fn()

      test('idを受け取り、対象のレコードのlikesを更新する', async () => {
        const req = mockReq({
          params: {
            id: 'test'
          }
        })

        const res = mockRes({
          locals: { userId: '5f24196497a4c3076ab1e757' }
        })

        await timelinesController.like(req, res, next)

        expect(Timeline.toggleLike).toHaveBeenCalledWith(
          'test',
          '5f24196497a4c3076ab1e757'
        )

        expect(res.sendStatus.calledWith(204)).toBeTruthy()
      })
    })

    describe('異常系', () => {
      const req = mockReq({
        params: {
          id: 'test'
        }
      })

      const res = mockRes({
        locals: { userId: '5f24196497a4c3076ab1e757' }
      })

      const next = jest.fn()

      test('dbエラー', async () => {
        mockError = true
        await timelinesController.like(req, res, next)

        expect(next).toHaveBeenCalled()
        const { output } = getCallError(next)
        expect(output.statusCode).toEqual(500)
      })
    })
  })
})
