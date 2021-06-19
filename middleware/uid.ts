import { Middleware } from '@nuxt/types'
import getLoginUser from '~/utils/getLoginUser'

const uid: Middleware = async ({ error, $axios, $auth, app }) => {
  const { $cookies } = app
  const uid: string = $cookies.get('userId')
  if ($auth.loggedIn && !uid) {
    const user = app.$cookies.get('userInfo') || getLoginUser($auth)
    try {
      const { data } = await $axios.post('/api/users', { user })
      $cookies.set('userId', data._id, {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict'
      })
      $cookies.set('userInfo', JSON.stringify(data), {
        maxAge: 60 * 60 * 24 * 365
      })
      $axios.defaults.headers.common.uid = data.uid
    } catch (e) {
      error(e)
    }
  }
}

export default uid
