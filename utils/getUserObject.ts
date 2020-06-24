import { Auth } from '@nuxtjs/auth'
import { User } from '~/types/user'

export default function getUserObject({
  user,
  $state: { strategy }
}: Auth): User {
  let userObject: User
  if (strategy === 'google') {
    userObject = {
      username: user.name,
      identifier: user.sub,
      email: user.email,
      photoURL: user.picture
    }
  } else if (strategy === 'github') {
    userObject = {
      username: user.name ? user.name : user.login,
      identifier: user.id,
      email: user.email,
      photoURL: user.avatar_url
    }
  } else if (strategy === 'facebook') {
    userObject = {
      username: user.name,
      identifier: user.id,
      email: user.email,
      photoURL: user.picture.data.url
    }
  } else {
    throw new Error('undefine strategy')
  }

  return userObject
}
