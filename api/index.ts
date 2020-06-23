import Express from 'express'
import router from './routes'

const app = Express()

app.use('/api', router)

export default app
