import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/ring-fit-log-dev', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.Promise = global.Promise
