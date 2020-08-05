import Express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import router from './routes'
import errorController from './controllers/ErrorController'
import { connect } from './db'

connect()

const app = Express()

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api', router)
app.use('/', errorController.errorHandler)

export default app
