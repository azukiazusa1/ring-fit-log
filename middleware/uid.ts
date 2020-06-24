import { Middleware } from '@nuxt/types'
import getUserObject from '~/utils/getUserObject'

const uid: Middleware = async ({ error, $axios, $auth, app }) => {
  const { $cookies } = app
  const uid: string = $cookies.get('uid')
  if ($auth.loggedIn && !uid) {
    try {
      const user = getUserObject($auth)
      const { data } = await $axios.post('/api/users', { user })
      $cookies.set('uid', data.uid, {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'strict'
      })
    } catch (e) {
      error({
        statusCode: e.response.status,
        message: e.response.message
      })
    }
  }
}

export default uid