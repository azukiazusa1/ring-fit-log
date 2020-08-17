import { Middleware } from '@nuxt/types'
import getLoginUser from '~/utils/getLoginUser'

const uid: Middleware = async ({ error, $axios, $auth, app }) => {
  const { $cookies } = app
  const uid: string = $cookies.get('userId')
  if ($auth.loggedIn && !uid) {
    const user = getLoginUser($auth)
    try {
      const { data } = await $axios.post('/api/users', { user })
      $axios.defaults.headers.common['uid'] = data.uid
      $cookies.set('userId', data.uid, {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict'
      })
    } catch (e) {
      error(e)
    }
  }
}

export default uid
