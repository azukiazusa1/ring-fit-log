import Express from 'express'
import timelinesController from '../controllers/timelinesController'

const router = Express.Router()

router.get('/', timelinesController.list)
router.put('/:id/like', timelinesController.like)

export default router
