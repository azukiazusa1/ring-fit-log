import { Auth } from '@nuxtjs/auth'

export interface LoginUser {
  username: string
  identifier: string
  photoURL: string
  email: string
}

export interface GitHubUser {
  name?: string
  login: string
  id: string
  email?: string
  // eslint-disable-next-line camelcase
  avatar_url: string
}

export interface GoogleUser {
  name: string
  sub: string
  email: string
  picture: string
}

export interface FacebookUser {
  name: string
  id: string
  email: string
  picture: {
    data: {
      url: string
    }
  }
}

export type GoogleStrategy = 'google'
export type GitHubStrategy = 'github'
export type FacebookStrategy = 'facebook'

export interface Google extends Auth {
  $state: {
    strategy: GoogleStrategy
  }
  user: Partial<GoogleUser>
}

export interface GitHub extends Auth {
  $state: {
    strategy: GitHubStrategy
  }
  user: Partial<GitHubUser>
}

export interface Facebook extends Auth {
  $state: {
    strategy: FacebookStrategy
  }
  user: Partial<FacebookUser>
}

export function isGoogle(test: Google | GitHub | Facebook): test is Google {
  return test.$state.strategy === 'google'
}

export function isGitHub(test: Google | GitHub | Facebook): test is GitHub {
  return test.$state.strategy === 'github'
}

export function isFacebook(test: Google | GitHub | Facebook): test is Facebook {
  return test.$state.strategy === 'facebook'
}
