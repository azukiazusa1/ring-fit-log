import Express from 'express'
import userRoutes from './userRoutes'

const router = Express.Router()

router.use('/users', userRoutes)

export default router
