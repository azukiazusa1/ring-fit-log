import Express from 'express'
import { LoginUser } from '~/types/auth'

export default {
  create: (req: Express.Request, res: Express.Response) => {
    const user: LoginUser = req.body.user
    console.log(user)
    // TODO とりあえずmock
    res.json({ uid: 'jfalfjafhaffj' })
  }
}
