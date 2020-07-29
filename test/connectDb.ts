import mongoose from 'mongoose'

export default () => {
  mongoose.Promise = global.Promise

  return mongoose.connect(
    (global as any).__MONGO_URI__,
    { useNewUrlParser: true, useCreateIndex: true },
    (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    }
  )
}
