export interface AverageData {
  avgTimeExercising: number
  avgCaloriesBurned: number
  avgDistanceRun: number
}

export interface FrequentTime {
  hour: number
  percentage: number
}

export interface FrequentTimeResponse {
  frequentTimes: FrequentTime[]
  userFrequentTimes: FrequentTime[]
}
