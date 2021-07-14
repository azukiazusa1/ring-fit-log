import mongoose, { ConnectionOptions, Error } from 'mongoose'

const options: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

export const connect = () => {
  mongoose.Promise = global.Promise
  if (process.env.NODE_ENV === 'test') {
    return mongoose.connect((global as any).__MONGO_URI__, options, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        process.exit(1)
      }
    })
  } else if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI, options)
  } else {
    throw new Error('Can not connect mongodb')
  }
}

export const disConnect = () => {
  return mongoose.connection.close()
}
