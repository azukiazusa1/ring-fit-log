import Express from 'express'
import auth from '../middleware/auth'
import userRoutes from './userRoutes'
import recordRoutes from './recordRoutes'
import chartRoutes from './chartRoutes'
import aggregateRoutes from './aggregateRoutes'
import errorRoutes from './errorRoutes'

const router = Express.Router()

router.use('/users', userRoutes)
router.use(auth)
router.use('/record', recordRoutes)
router.use('/chart', chartRoutes)
router.use('/aggregate', aggregateRoutes)
router.use('/', errorRoutes)

export default router
