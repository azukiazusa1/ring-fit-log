import AppUser from '~/api/models/User'
import { LoginUser } from '~/types/auth'
import { connect, disConnect } from '~/test/db'

const user1: LoginUser = {
  username: 'user1',
  strategy: 'github',
  identifier: '12345',
  email: 'aaa@example.com',
  photoURL: 'http://example.com'
}

const user2: LoginUser = {
  username: 'user2',
  strategy: 'google',
  identifier: '54321',
  email: 'aaa@example.com',
  photoURL: 'http://example.com'
}

const user3: LoginUser = {
  username: 'user3',
  strategy: 'github',
  identifier: 'abcde',
  email: 'aaa@example.com',
  photoURL: 'http://example.com'
}

describe('~/api/models/User', () => {
  let _id: string
  beforeAll(async () => {
    await connect()
  })

  beforeEach(async () => {
    await AppUser.remove({})
    const result = await AppUser.create(user1)
    _id = result._id
  })

  describe('findOrCreate', () => {
    test('ユーザーが存在するなら、そのユーザーを返す', async () => {
      const result = await AppUser.findOne().findOrCreate(user1)
      const count = await AppUser.count({})
      expect(result._id).toEqual(_id)
      expect(count).toEqual(1)
    })

    test('ユーザーが存在しないなら、作成してユーザーを返す', async () => {
      const result = await AppUser.findOne().findOrCreate(user2)
      const count = await AppUser.count({})
      expect(result.id).not.toEqual(_id)
      expect(result.username).toEqual(user2.username)
      expect(result.strategy).toEqual(user2.strategy)
      expect(result.identifier).toEqual(user2.identifier)
      expect(count).toEqual(2)
    })

    test('strategyが一致するが、identifierが一致しないユーザーは別のユーザー', async () => {
      const result = await AppUser.findOne().findOrCreate(user3)
      const count = await AppUser.count({})
      expect(result.id).not.toEqual(_id)
      expect(count).toEqual(2)
    })
  })

  afterAll(() => {
    disConnect()
  })
})
