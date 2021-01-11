import mongoose, {
  Schema,
  Document,
  Model,
  DocumentQuery,
  PaginateOptions,
  PaginateResult,
  FilterQuery
} from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import moment from 'moment'
import { IRecord } from '~/types/record'

export interface RecordDoc extends Document, IRecord {}

const recordSchema: Schema = new Schema(
  {
    totalTimeExercising: {
      type: Number,
      min: 0
    },
    totalCaloriesBurned: {
      type: Number,
      min: 0,
      max: 999.99
    },
    totalDistanceRun: {
      type: Number,
      min: 0,
      max: 100
    },
    date: {
      type: Date,
      required: true
    },
    stamps: {
      arms: {
        type: Boolean
      },
      stomach: {
        type: Boolean
      },
      legs: {
        type: Boolean
      },
      yoga: {
        type: Boolean
      }
    },
    userId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

recordSchema.index({ date: 1, userId: 1 }, { unique: true })

const queryHelpers = {
  findByDate(this: DocumentQuery<any, RecordDoc>, date: Date, userId: string) {
    return this.findOne({
      date: {
        $gte: moment(date)
          .utc()
          .startOf('day')
          .toDate(),
        $lt: moment(date)
          .utc()
          .endOf('day')
          .toDate()
      },

      userId
    })
  },
  findByWeek(this: DocumentQuery<any, RecordDoc>, date: Date, userId: string) {
    return this.find({
      date: {
        $gte: moment(date)
          .utc()
          .startOf('day')
          .toDate(),
        $lt: moment(date)
          .utc()
          .add(1, 'week')
          .endOf('day')
          .toDate()
      },
      userId
    })
  },
  findByMonth(this: DocumentQuery<any, RecordDoc>, date: Date, userId: string) {
    return this.find({
      date: {
        $gte: moment(date)
          .utc()
          .startOf('month')
          .toDate(),
        $lt: moment(date)
          .utc()
          .endOf('month')
          .toDate()
      },
      userId
    })
  }
}
recordSchema.query = queryHelpers

interface RecordModel extends Model<RecordDoc, typeof queryHelpers> {
  updateById(id: string, record: IRecord): Promise<RecordDoc>
  findByQuater(date: Date, userId: string): Promise<RecordDoc[]>
  findByYear(date: Date, userId: string): Promise<RecordDoc[]>
  average(): Promise<RecordDoc[]>
  averageByUser(userId: string): Promise<RecordDoc[]>
  paginate(
    query?: FilterQuery<RecordDoc>,
    options?: PaginateOptions,
    callback?: (err: any, result: PaginateResult<RecordDoc>) => void
  ): Promise<PaginateResult<RecordDoc>>
}

const statics = {
  updateById(this: RecordModel, id: string, record: IRecord) {
    return this.findByIdAndUpdate(id, record, {
      new: true,
      runValidators: true
    })
  },
  findByQuater(this: RecordModel, date: Date, userId: string) {
    return this.aggregate()
      .match({
        date: {
          $gte: moment(date)
            .utc()
            .startOf('month')
            .toDate(),
          $lt: moment(date)
            .utc()
            .add(3, 'month')
            .endOf('month')
            .toDate()
        },
        userId
      })
      .group({
        _id: {
          $week: '$date'
        },
        totalTimeExercising: { $sum: '$totalTimeExercising' },
        totalCaloriesBurned: { $sum: '$totalCaloriesBurned' },
        totalDistanceRun: { $sum: '$totalDistanceRun' },
        date: { $first: '$date' }
      })
      .sort({
        date: -1
      })
  },
  findByYear(this: RecordModel, date: Date, userId: string) {
    return this.aggregate()
      .match({
        date: {
          $gte: moment(date)
            .utc()
            .startOf('year')
            .toDate(),
          $lt: moment(date)
            .utc()
            .endOf('year')
            .toDate()
        },
        userId
      })
      .group({
        _id: {
          $month: '$date'
        },
        totalTimeExercising: { $sum: '$totalTimeExercising' },
        totalCaloriesBurned: { $sum: '$totalCaloriesBurned' },
        totalDistanceRun: { $sum: '$totalDistanceRun' },
        date: { $first: '$date' }
      })
      .sort({
        date: -1
      })
  },
  average(this: RecordModel) {
    return this.aggregate().group({
      _id: null,
      avgTimeExercising: { $avg: '$totalTimeExercising' },
      avgCaloriesBurned: { $avg: '$totalCaloriesBurned' },
      avgDistanceRun: { $avg: '$totalDistanceRun' }
    })
  },
  averageByUser(this: RecordModel, userId: string) {
    return this.aggregate()
      .match({ userId })
      .group({
        _id: null,
        avgTimeExercising: { $avg: '$totalTimeExercising' },
        avgCaloriesBurned: { $avg: '$totalCaloriesBurned' },
        avgDistanceRun: { $avg: '$totalDistanceRun' }
      })
  }
}
recordSchema.statics = statics

recordSchema.plugin(mongoosePaginate)

export default mongoose.model<RecordDoc, RecordModel>('Record', recordSchema)
