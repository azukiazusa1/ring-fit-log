import Express from 'express'
import Cookies from 'universal-cookie'

type Token = String | undefined

export default (req: Express.Request): Token => {
  const cookie = new Cookies(req.headers.cookie)
  const token: Token = cookie.get(`auth._token.${cookie.get('auth.strategy')}`)
  console.log(token)
  if (token) {
    return token.split(' ')[1]
  } else {
    return token
  }
}
