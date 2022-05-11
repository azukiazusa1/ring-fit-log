import mongoose, { Schema, Document, Model, models } from 'mongoose'
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
      enum: ['google', 'github', 'facebook', 'twitter']
    },
    identifier: {
      type: String,
      required: true
    },
    photoURL: {
      type: String,
      required: false
    },
    timeline: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)
interface UserModel extends Model<UserDoc> {
  findOrCreate(user: LoginUser): Promise<UserDoc>
}

userSchema.statics = {
  async findOrCreate(user: LoginUser) {
    const exists = await this.findOne({
      strategy: user.strategy,
      identifier: user.identifier
    }).exec()

    return exists || (await this.create(user))
  }
}

export default models.User
  ? (models.User as UserModel)
  : mongoose.model<UserDoc, UserModel>('User', userSchema)
