import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from '~/utils/api'
import { AverageData } from '~/types/aggregate'

@Module({
  name: 'aggregate',
  stateFactory: true,
  namespaced: true
})
export default class AggregateModule extends VuexModule {
  private averageData: AverageData = {
    avgCaloriesBurned: 0,
    avgDistanceRun: 0,
    avgTimeExercising: 0
  }

  private userAverageData: AverageData = {
    avgCaloriesBurned: 0,
    avgDistanceRun: 0,
    avgTimeExercising: 0
  }

  public get getAverageData() {
    return this.averageData
  }

  public get getUserAverageData() {
    return this.userAverageData
  }

  @Mutation
  private setAverageData(averageData: AverageData) {
    this.averageData = averageData
  }

  @Mutation
  private setUserAverageData(userAverageData: AverageData) {
    this.userAverageData = userAverageData
  }

  @Action({ rawError: true })
  public async fetch() {
    const { data } = await $axios.get<AverageData[]>(`/api/aggregate`)
    console.log(data)
    const [averageData, userAverageData] = data

    this.setAverageData(averageData)
    this.setUserAverageData(userAverageData)
  }
}
