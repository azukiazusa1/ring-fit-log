import mongoose, { Schema, Document, Model, DocumentQuery } from 'mongoose'
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

const queryHelpers = {
  findByDate(this: DocumentQuery<any, RecordDoc>, date: Date, userId: string) {
    return this.findOne({
      date: {
        $gte: date,
        $lt: new Date(
          moment(date)
            .add(1, 'day')
            .format()
        )
      },
      userId
    })
  }
}

recordSchema.query = queryHelpers
interface RecordModel extends Model<RecordDoc, typeof queryHelpers> {
  findOrCreate(date: Date, userId: string): Promise<RecordDoc>
}

export default mongoose.model<RecordDoc, RecordModel>('Record', recordSchema)
