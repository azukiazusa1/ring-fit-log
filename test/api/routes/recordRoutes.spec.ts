import recordRoutes from '~/api/routes/recordRoutes'
import recordsController from '~/api/controllers/recordsController'

jest.mock('express', () => ({
  Router: () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  })
}))
jest.mock('~/api/controllers/recordsController')

describe('~/api/routes/recordRoutes', () => {
  test('get /api/record/:date', () => {
    expect(recordRoutes.get).toHaveBeenCalledWith(
      '/:date',
      recordsController.show
    )
  })

  test('get /api/record/month/:date', () => {
    expect(recordRoutes.get).toHaveBeenCalledWith(
      '/month/:date',
      recordsController.month
    )
  })

  test('post /api/record', () => {
    expect(recordRoutes.post).toHaveBeenCalledWith(
      '/',
      recordsController.create
    )
  })

  test('put /api/record/:id', () => {
    expect(recordRoutes.put).toHaveBeenCalledWith(
      '/:id',
      recordsController.update
    )
  })

  test('delete /api/record/:id', () => {
    expect(recordRoutes.delete).toHaveBeenCalledWith(
      '/:id',
      recordsController.delete
    )
  })
})
