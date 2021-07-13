import timelineRoutes from '~/api/routes/timelineRoutes'
import timelinesController from '~/api/controllers/timelinesController'

jest.mock('express', () => ({
  Router: () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  })
}))
jest.mock('~/api/controllers/timelinesController')

describe('~/api/routes/timelineRoutes', () => {
  test('get /api/timeline/', () => {
    expect(timelineRoutes.get).toHaveBeenCalledWith(
      '/',
      timelinesController.list
    )
  })
})
