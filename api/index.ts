import Express from 'express'
import bodyParser from 'body-parser'
import router from './routes'

const app = Express()

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
app.use('/api', router)

export default app
