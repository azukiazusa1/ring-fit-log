import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { maxBy } from 'lodash'
import { $axios } from '~/utils/api'
import {
  AverageData,
  FrequentTime,
  FrequentTimeResponse
} from '~/types/aggregate'

const initialFrequentTimes = () => {
  const array: FrequentTime[] = []
  for (let hour = 0; hour < 24; hour++) {
    array.push({
      hour,
      percentage: 0
    })
  }
  return array
}

@Module({
  name: 'aggregate',
  stateFactory: true,
  namespaced: true
})
export default class AggregateModule extends VuexModule {
  private averageData: AverageData = {
    avgCaloriesBurned: 0,
    avgDistanceRun: 0,
    avgTimeExercising: 0,
    maxTimeExercising: 0,
    maxCaloriesBurned: 0,
    maxDistanceRun: 0,
    sumTimeExercising: 0,
    sumCaloriesBurned: 0,
    sumDistanceRun: 0
  }

  private userAverageData: AverageData = {
    avgCaloriesBurned: 0,
    avgDistanceRun: 0,
    avgTimeExercising: 0,
    maxTimeExercising: 0,
    maxCaloriesBurned: 0,
    maxDistanceRun: 0,
    sumTimeExercising: 0,
    sumCaloriesBurned: 0,
    sumDistanceRun: 0
  }

  private frequentTimes: FrequentTime[] = initialFrequentTimes()

  private userFrequentTimes: FrequentTime[] = initialFrequentTimes()

  public get getAverageData() {
    return this.averageData
  }

  public get getUserAverageData() {
    return this.userAverageData
  }

  public get getFrequentTimes() {
    return this.frequentTimes
  }

  public get getUserFrequentTimes() {
    return this.userFrequentTimes
  }

  public get getUserMostFrequentTime() {
    return maxBy(this.userFrequentTimes, 'percentage')
  }

  public get getMostFrequentTime() {
    return maxBy(this.frequentTimes, 'percentage')
  }

  @Mutation
  private setAverageData(averageData: AverageData) {
    this.averageData = averageData
  }

  @Mutation
  private setUserAverageData(userAverageData: AverageData) {
    this.userAverageData = userAverageData
  }

  @Mutation
  private setFrequentTimes(frequentTimes: FrequentTime[]) {
    this.frequentTimes = frequentTimes
  }

  @Mutation
  private setUserFrequentTimes(userFrequentTimes: FrequentTime[]) {
    this.userFrequentTimes = userFrequentTimes
  }

  @Action({ rawError: true })
  public async fetchAverage() {
    const { data } = await $axios.get<AverageData[]>(`/api/aggregate/average`)
    const [averageData, userAverageData] = data

    this.setAverageData(averageData)
    this.setUserAverageData(userAverageData)
  }

  @Action({ rawError: true })
  public async fetchFrequentTimes() {
    const { data } = await $axios.get<FrequentTimeResponse>(
      `/api/aggregate/frequent/times`
    )
    const { frequentTimes, userFrequentTimes } = data

    this.setFrequentTimes(frequentTimes)
    this.setUserFrequentTimes(userFrequentTimes)
  }
}
