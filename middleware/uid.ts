import { Middleware } from '@nuxt/types'
import getLoginUser from '~/utils/getLoginUser'

const uid: Middleware = async ({ error, $axios, $auth, app }) => {
  const { $cookies } = app
  const uid: string = $cookies.get('uid')
  if ($auth.loggedIn && !uid) {
    const user = getLoginUser($auth)
    try {
      const { data } = await $axios.post('/api/users', { user })
      $cookies.set('uid', data.uid, {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict'
      })
    } catch (e) {
      error(e.message)
    }
  }
}

export default uid
