import { Middleware } from '@nuxt/types'

const uid: Middleware = async ({ error, $axios, $auth, app }) => {
  const { $cookies } = app
  console.log($auth.loggedIn)
  const uid: string = $cookies.get('uid')
  console.log(!uid)
  if ($auth.loggedIn && !uid) {
    console.log(1)
    try {
      const { data } = await $axios.post('/api/users', {
        user: $auth.user
      })
      console.log(data)
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
