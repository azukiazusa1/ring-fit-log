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
      const result = await AppUser.findOne().findOrCreate(user)
      res.status(httpStatus.OK).json({ uid: result._id })
    } catch (e) {
      next(Boom.internal('Database Error Occurred'))
    }
  }
}
