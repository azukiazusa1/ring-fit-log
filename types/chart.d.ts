import { ChartPoint } from 'chart.js'

export type week1 = 1
export type month1 = 2
export type month3 = 3
export type year1 = 4

export type DateRange = week1 | month1 | month3 | year1

export interface ChartData {
  [key: string]: ChartPoint[]
  totalCaloriesBurned: ChartPoint[]
  totalDistanceRun: ChartPoint[]
  totalTimeExercising: ChartPoint[]
}
