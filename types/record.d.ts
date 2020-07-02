export interface Stamps {
  arms: boolean
  stomach: boolean
  legs: boolean
  yoga: boolean
}

export interface Record {
  totalTimeExercising: string
  totalCaloriesBurned: number | null
  totalDistanceRun: number | null
  date: Date | string
  stamps: Stamps
}
