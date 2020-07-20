import Express from 'express'
import userRoutes from './userRoutes'
import recordRoutes from './recordRoutes'
import chartRoutes from './chartRoutes'

const router = Express.Router()

router.use('/users', userRoutes)
router.use('/record', recordRoutes)
router.use('/chart', chartRoutes)
router.use('/', (_req, res) => {
  res.status(404)
  res.json({ message: 'Not Found' })
})

export default router
