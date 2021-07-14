import Express from 'express'
import auth from '../middleware/auth'
import userRoutes from './userRoutes'
import recordRoutes from './recordRoutes'
import chartRoutes from './chartRoutes'
import aggregateRoutes from './aggregateRoutes'
import timelineRoutes from './timelineRoutes'
import errorRoutes from './errorRoutes'

const router = Express.Router()

router.use(auth)
router.use('/users', userRoutes)
router.use('/record', recordRoutes)
router.use('/chart', chartRoutes)
router.use('/aggregate', aggregateRoutes)
router.use('/timelines', timelineRoutes)
router.use('/', errorRoutes)

export default router
