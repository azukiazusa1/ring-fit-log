import middleware from '~/middleware/uid'
import getLoginUser from '~/utils/getLoginUser'

let mockError = false
const uid = '12345'
const error = jest.fn()
const $axios = {
  post: jest.fn((url, data) => {
    if (mockError) {
      return Promise.reject('mock error')
    }
    return Promise.resolve({ uid })
  })
}

const cb = () => {}

jest.mock('~/utils/getLoginUser')
getLoginUser.mockImplementation(() => {
  return {
    username: 'username',
    strategy: 'github',
    identifier: 'abcde',
    email: 'aaa@example.com',
    photoURL: 'example'
  }
})

describe('~/middleware/uid', () => {
  beforeEach(() => {
    mockError = false
  })
  describe('正常系', () => {
    describe('未ログイン && cookieにuidがない', () => {
      const app = {
        $cookies: {
          get() {
            return ''
          },
          set: jest.fn()
        }
      }
      const $auth = {
        loggedIn: false
      }
      const context = {
        error,
        $axios,
        app,
        $auth
      }
      test('$axios.postが呼ばれない', async () => {
        await middleware(context, cb)
        expect($axios.post).toHaveBeenCalledTimes(0)
      })
    })
  })
})
