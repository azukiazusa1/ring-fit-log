import Express from 'express'
import ErrorController from '../controllers/ErrorController'

const router = Express.Router()

router.use(ErrorController.notFound)

export default router
