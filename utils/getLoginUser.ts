import { LoginUser, Google, GitHub, Facebook, Twitter } from '~/types/auth'
import Cookie from 'universal-cookie'
import { isEmpty } from 'lodash'

export function isGoogle(
  test: Google | GitHub | Facebook | Twitter
): test is Google {
  return test.$state.strategy === 'google'
}

export function isGitHub(
  test: Google | GitHub | Facebook | Twitter
): test is GitHub {
  return test.$state.strategy === 'github'
}

export function isFacebook(
  test: Google | GitHub | Facebook | Twitter
): test is Facebook {
  return test.$state.strategy === 'facebook'
}

export function isTwitter(
  test: Google | GitHub | Facebook | Twitter
): test is Twitter {
  return test.$state.strategy === 'twitter'
}

export default function getloginUser(
  auth: Google | GitHub | Facebook | Twitter
): Partial<LoginUser> {
  let loginUser: Partial<LoginUser>
  if (isGoogle(auth)) {
    const { user } = auth
    loginUser = {
      username: user.name,
      identifier: user.sub,
      strategy: 'google',
      email: user.email,
      photoURL: user.picture
    }
  } else if (isGitHub(auth)) {
    const { user } = auth
    loginUser = {
      username: user.name ? user.name : user.login,
      identifier: user.id,
      strategy: 'github',
      email: user.email,
      photoURL: user.avatar_url
    }
  } else if (isFacebook(auth)) {
    const { user } = auth
    loginUser = {
      username: user.name,
      identifier: user.id,
      strategy: 'facebook',
      email: user.email,
      photoURL: user.picture!.data.url
    }
  } else if (isTwitter(auth)) {
    const { user } = auth

    loginUser = {
      username: user.displayName,
      identifier: user.id,
      strategy: 'twitter',
      email: '',
      photoURL: user.photos ? user.photos[0].value : ''
    }
  } else {
    throw new Error('Invalid strategy')
  }

  return loginUser
}
