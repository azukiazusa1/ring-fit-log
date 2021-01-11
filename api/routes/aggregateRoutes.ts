import Express from 'express'
import aggregateController from '../controllers/aggreateController'

const router = Express.Router()

router.get(
  '/average',
  aggregateController.average
)

export default router
