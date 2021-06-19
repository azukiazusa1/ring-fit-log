import Express from 'express'
import usersController from '../controllers/usersController'

const router = Express.Router()

router.post('/', usersController.create)
router.put('/', usersController.update)

export default router
