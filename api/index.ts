import Express from 'express'
import bodyParser from 'body-parser'
import router from './routes'
import errorController from './controllers/ErrorController'
import './db'

const app = Express()

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
app.use('/api', router)
app.use('/', errorController.errorHandler)

export default app
