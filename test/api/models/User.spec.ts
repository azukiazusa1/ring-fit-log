import AppUser from '~/api/models/User'
import { LoginUser } from '~/types/auth'
import connectDb from '~/test/connectDb'

const user: LoginUser = {
  username: 'abced',
  strategy: 'github',
  identifier: '12345',
  email: 'aaa@example.com',
  photoURL: 'http://example.com'
}

describe('~/api/models/User', () => {
  beforeAll(async () => {
    await connectDb()
  })
  it('create', async () => {
    const a = await AppUser.create(user)
    expect(a._id).toBeDefined()
  })
})
