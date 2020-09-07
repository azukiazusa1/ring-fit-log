import { Error } from 'mongoose'
import AppUser from '~/api/models/User'
import { LoginUser } from '~/types/auth'
import { connect, disConnect } from '~/api/db'

const { ValidationError } = Error

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

const user4: LoginUser = {
  username: 'user1',
  strategy: 'google',
  identifier: '12345',
  email: 'aaa@example.com',
  photoURL: 'http://example.com'
}

describe('~/api/models/User', () => {
  beforeAll(async () => {
    await connect()
  })

  describe('findOrCreate', () => {
    let _id: string
    beforeEach(async () => {
      await AppUser.deleteMany({})
      const result = await AppUser.create(user1)
      _id = result._id
    })

    test('ユーザーが存在するなら、そのユーザーを返す', async () => {
      const result = await AppUser.findOne().findOrCreate(user1)
      const count = await AppUser.countDocuments({})
      expect(result._id).toEqual(_id)
      expect(count).toEqual(1)
    })

    test('ユーザーが存在しないなら、作成してユーザーを返す', async () => {
      const result = await AppUser.findOne().findOrCreate(user2)
      const count = await AppUser.countDocuments({})
      expect(result.id).not.toEqual(_id)
      expect(result.username).toEqual(user2.username)
      expect(result.strategy).toEqual(user2.strategy)
      expect(result.identifier).toEqual(user2.identifier)
      expect(count).toEqual(2)
    })

    test('strategyが一致するが、identifierが異なるユーザーは別のユーザー', async () => {
      const result = await AppUser.findOne().findOrCreate(user3)
      const count = await AppUser.countDocuments({})
      expect(result.id).not.toEqual(_id)
      expect(count).toEqual(2)
    })

    test('identifierが一致するが、stragefyが異なるユーザーは別のユーザー', async () => {
      const result = await AppUser.findOne().findOrCreate(user4)
      const count = await AppUser.countDocuments({})
      expect(result.id).not.toEqual(_id)
      expect(count).toEqual(2)
    })

    test('バリデーションが働いている', async () => {
      const invalidUser = {
        username: '',
        strategy: 'github',
        identifier: '11111',
        email: 'aaa@example.com',
        photoURL: 'http://example.com'
      }
      await expect(AppUser.findOne().findOrCreate(invalidUser)).rejects.toThrow(
        ValidationError
      )
    })
  })

  describe('バリデーション', () => {
    describe('username', () => {
      test('usernameは必須項目', async () => {
        const invalidUser = {
          username: '',
          strategy: 'github',
          identifier: '11111',
          email: 'aaa@example.com',
          photoURL: 'http://example.com'
        }
        await expect(AppUser.create(invalidUser)).rejects.toThrow(
          ValidationError
        )
      })
    })

    describe('strategy', () => {
      test('strategyは必須項目', async () => {
        const invalidUser = {
          username: 'username',
          strategy: '',
          identifier: '11111',
          email: 'aaa@example.com',
          photoURL: 'example'
        }
        await expect(AppUser.create(invalidUser)).rejects.toThrow(
          ValidationError
        )
      })

      test('githubはOK', async () => {
        const invalidUser = {
          username: 'username',
          strategy: 'github',
          identifier: '11111',
          email: 'aaa@example.com',
          photoURL: 'example'
        }
        const result = await AppUser.create(invalidUser)
        expect(result._id).toBeDefined()
      })

      test('googleはOK', async () => {
        const invalidUser = {
          username: 'username',
          strategy: 'google',
          identifier: '11111',
          email: 'aaa@example.com',
          photoURL: 'example'
        }
        const result = await AppUser.create(invalidUser)
        expect(result._id).toBeDefined()
      })

      test('facebookはOK', async () => {
        const invalidUser = {
          username: 'username',
          strategy: 'facebook',
          identifier: '11111',
          email: 'aaa@example.com',
          photoURL: 'example'
        }
        const result = await AppUser.create(invalidUser)
        expect(result._id).toBeDefined()
      })

      test('twitterはOK', async () => {
        const invalidUser = {
          username: 'username',
          strategy: 'twitter',
          identifier: '11111',
          email: 'aaa@example.com',
          photoURL: 'example'
        }
        const result = await AppUser.create(invalidUser)
        expect(result._id).toBeDefined()
      })

      test('それ以外はNG', async () => {
        const invalidUser = {
          username: 'username',
          strategy: 'yahoo',
          identifier: '11111',
          email: 'aaa@example.com',
          photoURL: 'example'
        }
        await expect(AppUser.create(invalidUser)).rejects.toThrow(
          ValidationError
        )
      })
    })

    describe('identifier', () => {
      test('identifierは必須項目', async () => {
        const invalidUser = {
          username: 'username',
          strategy: 'github',
          identifier: '',
          email: 'aaa@example.com',
          photoURL: 'example'
        }
        await expect(AppUser.create(invalidUser)).rejects.toThrow(
          ValidationError
        )
      })
    })
  })

  afterAll(() => {
    disConnect()
  })
})
