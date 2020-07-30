import mongoose, { Schema, Document, Model, DocumentQuery } from 'mongoose'
import { LoginUser } from '~/types/auth'

export interface UserDoc extends Document, LoginUser {}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    strategy: {
      type: String,
      required: true,
      enum: ['google', 'github', 'facebook']
    },
    identifier: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const queryHelpers = {
  findOrCreate(this: DocumentQuery<any, UserDoc>, user: LoginUser) {
    return this.findOneAndUpdate(
      {
        strategy: user.strategy,
        identifier: user.identifier
      },
      user,
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    )
  }
}
userSchema.query = queryHelpers
interface UserModel extends Model<UserDoc, typeof queryHelpers> {
  findOrCreate(user: LoginUser): Promise<UserDoc>
}

export default mongoose.model<UserDoc, UserModel>('User', userSchema)
