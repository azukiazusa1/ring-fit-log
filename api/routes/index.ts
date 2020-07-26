import Express from 'express'
import userRoutes from './userRoutes'
import recordRoutes from './recordRoutes'
import chartRoutes from './chartRoutes'
import errorRoutes from './errorRoutes'

const router = Express.Router()

router.use('/users', userRoutes)
router.use('/record', recordRoutes)
router.use('/chart', chartRoutes)
router.use('/', errorRoutes)

export default router
