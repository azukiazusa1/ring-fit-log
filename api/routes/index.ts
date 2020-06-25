import Express from 'express'
import Cookies from 'universal-cookie'
import userRoutes from './userRoutes'

const router = Express.Router()

router.use('/users', userRoutes)
router.use('/todos', (_req, res) => {
  res.json([
    {
      id: 1,
      title: 'リスト1',
      description: 'lorem ipsum',
      done: true
    },
    {
      id: 2,
      title: 'リスト2',
      description: 'lorem ipsum',
      done: false
    },
    {
      id: 3,
      title: 'リスト3',
      description: 'lorem ipsum',
      done: true
    }
  ])
})
router.use('/', (req, res) => {
  res.status(404)
  res.json({ message: 'Not Found' })
})

export default router
