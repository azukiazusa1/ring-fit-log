export interface Stamps {
  arms: boolean
  stomach: boolean
  legs: boolean
  yoga: boolean
}

export interface IRecord {
  totalTimeExercising: number | null
  totalCaloriesBurned: number | null
  totalDistanceRun: number | null
  comment: string
  date: Date | string
  stamps: Stamps
  userId: string
}

export interface Record extends IRecord {
  _id: string
}
