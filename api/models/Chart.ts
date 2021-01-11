import moment from 'moment'
import { isEmpty, floor } from 'lodash'
import { ChartPoint } from 'chart.js'
import { ChartData } from '../../types/chart'
import Record, { RecordDoc } from './Record'

export default class Chart {
  private _date: Date
  private _userId: string
  constructor(date: Date, userId: string) {
    this._date = date
    this._userId = userId
  }

  public get date() {
    return this._date
  }

  public get userId() {
    return this._userId
  }

  private convert(records: RecordDoc[]) {
    if (isEmpty(records)) {
      return {
        totalTimeExercising: [],
        totalCaloriesBurned: [],
        totalDistanceRun: []
      } as ChartData
    }

    const totalTimeExercising: ChartPoint[] = []
    const totalCaloriesBurned: ChartPoint[] = []
    const totalDistanceRun: ChartPoint[] = []

    records.forEach((record) => {
      if (record.totalTimeExercising !== null) {
        totalTimeExercising.push({
          x: record.date,
          y: record.totalTimeExercising
        })
      }

      if (record.totalCaloriesBurned !== null) {
        totalCaloriesBurned.push({
          x: record.date,
          y: floor(record.totalCaloriesBurned, 2)
        })
      }

      if (record.totalDistanceRun !== null) {
        totalDistanceRun.push({
          x: record.date,
          y: floor(record.totalDistanceRun, 2)
        })
      }
    })

    return {
      totalTimeExercising,
      totalCaloriesBurned,
      totalDistanceRun
    } as ChartData
  }

  public async week() {
    const records = await Record.find().findByWeek(this.date, this.userId)
    return this.convert(records)
  }

  public async month() {
    const records = await Record.find().findByMonth(this.date, this.userId)
    return this.convert(records)
  }

  public async quarter() {
    const records = await Record.findByQuater(this.date, this.userId)
    const ajustRecords = records.map((v) => {
      v.date = moment(v.date)
        .startOf('week')
        .toDate()
      return v
    })
    return this.convert(ajustRecords)
  }

  public async year() {
    const records = await Record.findByYear(this.date, this.userId)
    return this.convert(records)
  }
}
