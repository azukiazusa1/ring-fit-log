import mongoose, {
  Schema,
  Document,
  Model,
  models,
  FilterQuery,
  PaginateOptions,
  PaginateResult
} from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import { LoginUser } from '~/types/auth'
import { Record } from '~/types/record'
import { Timeline } from '~/types/timeline'

export interface TimelineDoc extends Document {
  user: LoginUser & { _id?: string }
  record: Record
  likes: string[]
  createdAt: string
  updatedAt: string
}

const timelineSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: {
        select: ['username', 'photoURL']
      }
    },
    record: {
      type: Schema.Types.ObjectId,
      ref: 'Record',
      required: true,
      autopopulate: {
        select: [
          'stamps',
          'comment',
          'totalDistanceRun',
          'totalCaloriesBurned',
          'totalTimeExercising'
        ]
      }
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
interface TimelineModel extends Model<TimelineDoc> {
  paginate(
    query?: FilterQuery<TimelineDoc>,
    options?: PaginateOptions,
    callback?: (err: any, result: PaginateResult<TimelineDoc>) => void
  ): Promise<PaginateResult<TimelineDoc>>
}

timelineSchema.plugin(mongoosePaginate)
timelineSchema.plugin(mongooseAutoPopulate)

export const convert = (
  result: PaginateResult<TimelineDoc>,
  userId: string
): PaginateResult<Timeline> => {
  const docs: Timeline[] = result.docs.map((doc) => {
    const me = doc.user._id === userId
    const likeCount = doc.likes.length
    const isLiked = doc.likes.includes(userId)

    delete doc.user._id

    return {
      _id: doc._id,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      record: doc.record,
      user: doc.user,
      me,
      likeCount,
      isLiked
    }
  })

  return {
    ...result,
    docs
  }
}

export default models.Timeline
  ? (models.Timeline as TimelineModel)
  : mongoose.model<TimelineDoc, TimelineModel>('Timeline', timelineSchema)
