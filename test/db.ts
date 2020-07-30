import mongoose from 'mongoose'

export const connect = () => {
  mongoose.Promise = global.Promise

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
}

export const disConnect = () => {
  return mongoose.connection.close()
}
