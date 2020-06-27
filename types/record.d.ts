type TotalTimeExercising = {
  hour: string
  second: string
  milliseconds: string
}

export interface Record {
  totalTimeExercising: TotalTimeExercising
  totalCaloriesBurned: number
  totalDistanceRun: number
  date: Date
}
