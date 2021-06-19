import Express from 'express'
import Boom from '@hapi/boom'
import AppUser from '../models/User'

export default async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  if (req.method === 'POST' && req.path === '/users') next()
  const userId = req.cookies.userId ?? req.headers?.uid
  const user = await AppUser.findById(userId)
  if (user) {
    res.locals.userId = userId
    next()
  } else {
    next(Boom.unauthorized())
  }
}
