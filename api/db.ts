import mongoose from 'mongoose'

export const connect = () => {
  mongoose.Promise = global.Promise
  if (process.env.NODE_ENV === 'test') {
    return mongoose.connect(
      (global as any).__MONGO_URI__,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      },
      (err) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
      }
    )
  } else if (process.env.NODE_ENV === 'development') {
    mongoose.connect('mongodb://localhost:27017/ring-fit-log-dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  }
}

export const disConnect = () => {
  return mongoose.connection.close()
}
