import Express from 'express'
import Cookies from 'universal-cookie'
import Boom from '@hapi/boom'

export default (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const cookie = new Cookies(req.headers.cookie)
  const uid = cookie.get('uid')
  if (uid) {
    res.locals.uid = uid
    next()
  } else {
    next(Boom.unauthorized())
  }
}
