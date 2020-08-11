import Record, { RecordDoc } from './Record'
import { isEmpty } from 'lodash'
import { ChartPoint } from 'chart.js'
import { ChartData } from '../../types/chart'
import record from '~/test/api/seed/record'

export default class Chart {
  private _date: Date
  private _userId: string
  constructor(date: Date, userId: string) {
    this._date = date
    this._userId = userId
  }

  public set date(date: Date) {
    this.date = date
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
      if (record.totalTimeExercising) {
        totalTimeExercising.push({
          x: record.date,
          y: record.totalTimeExercising
        })
      }

      if (record.totalCaloriesBurned) {
        totalCaloriesBurned.push({
          x: record.date,
          y: record.totalCaloriesBurned
        })
      }

      if (record.totalDistanceRun) {
        totalDistanceRun.push({
          x: record.date,
          y: record.totalDistanceRun
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
}
