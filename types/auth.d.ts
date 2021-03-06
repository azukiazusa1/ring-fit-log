export interface LoginUser {
  username: string
  identifier: string
  strategy: string
  photoURL: string
  email: string
  timeline?: boolean
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

type photo = {
  value: string
}
export interface TwitterUser {
  readonly displayName: string
  readonly id: string
  readonly photos: photo[]
}

export type GoogleStrategy = 'google'
export type GitHubStrategy = 'github'
export type FacebookStrategy = 'facebook'
export type TwitterStrategy = 'twitter'

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

export interface Twitter {
  $state: {
    strategy: TwitterStrategy
  }
  user: Partial<TwitterUser>
}
