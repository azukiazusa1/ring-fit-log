import Express from 'express'
import recordsController from '../controllers/recordsController'

const router = Express.Router()

router.get('/:date', recordsController.show)
router.post('/', recordsController.create)

export default router
