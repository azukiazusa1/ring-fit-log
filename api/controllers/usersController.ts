import Express from 'express'
import Cookies from 'universal-cookie'

export default {
  create: (req: Express.Request, res: Express.Response) => {
    const cookie = new Cookies(req.headers.cookie)
    cookie.set('uid', 'jflskjafafkj')
    res.json({ status: 'ok' })
  }
}
