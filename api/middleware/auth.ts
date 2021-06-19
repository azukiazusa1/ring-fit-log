import Express from 'express'
import Boom from '@hapi/boom'

export default (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  if (req.method === 'POST' && req.path === '/users') return next()
  const userId = req.cookies.userId ?? req.headers?.uid
  if (userId) {
    res.locals.userId = userId
    next()
  } else {
    next(Boom.unauthorized())
  }
}
