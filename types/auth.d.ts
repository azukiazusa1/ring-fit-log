export interface LoginUser {
  username: string
  identifier: string
  strategy: string
  photoURL: string
  email: string
}

export interface GitHubUser {
  readonly name?: string
  readonly login: string
  readonly id: string
  readonly email?: string
  // eslint-disable-next-line camelcase
  readonly avatar_url: string
}

export interface GoogleUser {
  readonly name: string
  readonly sub: string
  readonly email: string
  readonly picture: string
}

export interface FacebookUser {
  readonly name: string
  readonly id: string
  readonly email: string
  readonly picture: {
    readonly data: {
      readonly url: string
    }
  }
}

export type GoogleStrategy = 'google'
export type GitHubStrategy = 'github'
export type FacebookStrategy = 'facebook'

export interface Google {
  $state: {
    strategy: GoogleStrategy
  }
  user: Partial<GoogleUser>
}

export interface GitHub {
  $state: {
    strategy: GitHubStrategy
  }
  user: Partial<GitHubUser>
}

export interface Facebook {
  $state: {
    strategy: FacebookStrategy
  }
  user: Partial<FacebookUser>
}
