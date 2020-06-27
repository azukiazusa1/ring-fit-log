type TotalTimeExercising = {
  hour: string
  minute: string
  second: string
}

export interface Record {
  totalTimeExercising: TotalTimeExercising
  totalCaloriesBurned: number
  totalDistanceRun: number
  date: Date | string
}
