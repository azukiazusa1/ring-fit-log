import Express from 'express'
import Cookies from 'universal-cookie'
import userRoutes from './userRoutes'

const router = Express.Router()

router.use('/users', userRoutes)
router.use('/', (req, res) => {
  const cookies = new Cookies(req.headers.cookie)
  console.log(cookies)
  res.json({ status: 'ok' })
})

export default router
