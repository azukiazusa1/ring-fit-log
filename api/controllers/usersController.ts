import Express from 'express'
import httpStatus from 'http-status-codes'
import Boom from '@hapi/boom'
import AppUser from '../models/User'
import { LoginUser } from '~/types/auth'

export default {
  create: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const user: LoginUser = req.body.user
    try {
      const result = await AppUser.findOrCreate(user)
      res.status(httpStatus.OK).json(result)
    } catch (e) {
      next(Boom.internal())
    }
  },
  update: async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { username, photoURL } = req.body
    const userId = res.locals.userId
    try {
      const result = await AppUser.findByIdAndUpdate(
        userId,
        { username, photoURL },
        { new: true }
      )
      res.status(httpStatus.OK).json(result)
    } catch (e) {
      next(Boom.internal())
    }
  }
}
