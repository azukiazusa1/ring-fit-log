export interface TotalTimeExercising {
  hour: string
  minute: string
  second: string
}

export interface stamps {
  arms: boolean
  stomach: boolean
  legs: boolean
  yoga: boolean
}

export interface Record {
  totalTimeExercising: TotalTimeExercising
  totalCaloriesBurned: number
  totalDistanceRun: number
  date: Date | string
  stamps: stamps
}
