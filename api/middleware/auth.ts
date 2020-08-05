import Express from 'express'
import Boom from '@hapi/boom'

export default (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  console.log(req.cookies)
  console.log(req.cookies.userId)
  const userId = req.cookies.userId
  if (userId) {
    res.locals.userId = userId
    next()
  } else {
    next(Boom.unauthorized())
  }
}
