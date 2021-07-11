import mongoose, { Schema, Document, Model, models } from 'mongoose'
import { LoginUser } from '~/types/auth'
import { Record } from '~/types/record'

export interface TimelineDoc extends Document {
  user: LoginUser
  record: Record
  likes: string[]
}

const timelineSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    record: {
      type: Schema.Types.ObjectId,
      ref: 'Record',
      required: true
    },
    likes: {
      type: [String],
      requird: true
    }
  },
  {
    timestamps: true
  }
)
interface TimelineModel extends Model<TimelineDoc> {}

export default models.Timeline
  ? (models.Timeline as TimelineModel)
  : mongoose.model<TimelineDoc, TimelineModel>('Timeline', timelineSchema)
