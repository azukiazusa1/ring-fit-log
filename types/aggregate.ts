export interface AverageData {
  avgTimeExercising: number
  avgCaloriesBurned: number
  avgDistanceRun: number
  maxTimeExercising: number
  maxCaloriesBurned: number
  maxDistanceRun: number
  sumTimeExercising: number
  sumCaloriesBurned: number
  sumDistanceRun: number
}

export interface FrequentTime {
  hour: number
  percentage: number
}

export interface FrequentTimeResponse {
  frequentTimes: FrequentTime[]
  userFrequentTimes: FrequentTime[]
}
