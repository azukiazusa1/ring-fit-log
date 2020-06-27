import getLoginUser from '~/utils/getLoginUser'
import {
  GoogleUser,
  GitHubUser,
  FacebookUser,
  Google,
  GitHub,
  Facebook
} from '~/types/auth'

describe('utils/getLoginUser', () => {
  test('Googleユーザー', () => {
    const user: GoogleUser = {
      name: 'ユーザー1',
      sub: '12345',
      email: 'test@example.com',
      picture: 'http://example-picture.com'
    }

    const auth: Google = {
      user,
      $state: {
        strategy: 'google'
      }
    }

    const loginUser = getLoginUser(auth)
    expect(loginUser.username).toEqual(user.name)
    expect(loginUser.identifier).toEqual(user.sub)
    expect(loginUser.email).toEqual(user.email)
    expect(loginUser.photoURL).toEqual(user.picture)
  })

  test('GitHubユーザーユーザ名なし', () => {
    const user: GitHubUser = {
      name: undefined,
      login: 'user',
      id: '12345',
      email: 'test@example.com',
      avatar_url: 'http://example-picture.com'
    }

    const auth: GitHub = {
      user,
      $state: {
        strategy: 'github'
      }
    }
    const loginUser = getLoginUser(auth)
    expect(loginUser.username).toEqual(user.login)
    expect(loginUser.identifier).toEqual(user.id)
    expect(loginUser.email).toEqual(user.email)
    expect(loginUser.photoURL).toEqual(user.avatar_url)
  })

  test('GitHubユーザーユーザ名あり', () => {
    const user: GitHubUser = {
      name: 'username',
      login: 'user',
      id: '12345',
      email: 'test@example.com',
      avatar_url: 'http://example-picture.com'
    }

    const auth: GitHub = {
      user,
      $state: {
        strategy: 'github'
      }
    }
    const loginUser = getLoginUser(auth)
    expect(loginUser.username).toEqual(user.name)
    expect(loginUser.identifier).toEqual(user.id)
    expect(loginUser.email).toEqual(user.email)
    expect(loginUser.photoURL).toEqual(user.avatar_url)
  })

  test('Facebookユーザー', () => {
    const user: FacebookUser = {
      name: 'ユーザー1',
      id: '12345',
      email: 'test@example.com',
      picture: {
        data: {
          url: 'http://example-picture.com'
        }
      }
    }

    const auth: Facebook = {
      user,
      $state: {
        strategy: 'facebook'
      }
    }

    const loginUser = getLoginUser(auth)
    expect(loginUser.username).toEqual(user.name)
    expect(loginUser.identifier).toEqual(user.id)
    expect(loginUser.email).toEqual(user.email)
    expect(loginUser.photoURL).toEqual(user.picture.data.url)
  })
})
