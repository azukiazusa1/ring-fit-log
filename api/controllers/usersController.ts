import Express from 'express'
import { User } from '~/types/user'

export default {
  create: (req: Express.Request, res: Express.Response) => {
    const user: User = req.body.user
    console.log(user)
    // TODO とりあえずmock
    res.json({ uid: 'jfalfjafhaffj' })
  }
}
