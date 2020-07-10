export interface Stamps {
  arms: boolean
  stomach: boolean
  legs: boolean
  yoga: boolean
}

export interface Record {
  _id: string
  totalTimeExercising: string | null
  totalCaloriesBurned: number | null
  totalDistanceRun: number | null
  date: Date | string
  stamps: Stamps
  userId: string
}
