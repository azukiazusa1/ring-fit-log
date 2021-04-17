import userRoutes from '~/api/routes/userRoutes'
import usersController from '~/api/controllers/usersController'

jest.mock('express', () => ({
  Router: () => ({
    post: jest.fn()
  })
}))
jest.mock('~/api/controllers/usersController')

describe('~/api/routes/userRoutes', () => {
  test('post /api/user', () => {
    expect(userRoutes.post).toHaveBeenCalledWith('/', usersController.create)
  })
})
