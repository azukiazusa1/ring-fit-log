import {
  LoginUser,
  Google,
  GitHub,
  Facebook,
  isGoogle,
  isGitHub,
  isFacebook
} from '~/types/auth'

export default function getloginUser(
  auth: Google | GitHub | Facebook
): Partial<LoginUser> {
  let loginUser: Partial<LoginUser>
  if (isGoogle(auth)) {
    const { user } = auth
    loginUser = {
      username: user.name,
      identifier: user.sub,
      email: user.email,
      photoURL: user.picture
    }
  } else if (isGitHub(auth)) {
    const { user } = auth
    loginUser = {
      username: user.name ? user.name : user.login,
      identifier: user.id,
      email: user.email,
      photoURL: user.avatar_url
    }
  } else if (isFacebook(auth)) {
    const { user } = auth
    loginUser = {
      username: user.name,
      identifier: user.id,
      email: user.email,
      photoURL: user.picture!.data.url
    }
  } else {
    throw new Error('Invalid strategy')
  }

  return loginUser
}
