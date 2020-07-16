import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import moment from 'moment'
import { unionBy, property } from 'lodash'
import { ChartPoint } from 'chart.js'
import { $axios } from '~/utils/api'
import { ChartData, DateRange } from '~/types/chart'
import { WEEK1, MONTH1, MONTH3, YEAR1 } from '~/config/constant'

const getFilteredChartData = (
  dataSets: ChartPoint[],
  date: Date,
  dateRange: DateRange
) => {
  switch (dateRange) {
    case WEEK1:
      return dataSets.filter((dataSet) =>
        moment(dataSet.x).isBetween(
          date,
          moment(date).add(1, 'weeks'),
          'day',
          '[]'
        )
      )
    case MONTH1:
      return dataSets.filter((dataSet) =>
        moment(dataSet.x).isSame(date, 'month')
      )
    case MONTH3:
      return dataSets.filter((dataSet) =>
        moment(dataSet.x).isBetween(
          date,
          moment(date).add(3, 'month'),
          'month',
          '[]'
        )
      )
    case YEAR1:
      return dataSets.filter((dataSet) =>
        moment(dataSet.x).isSame(date, 'year')
      )
    default:
      throw new Error('Invalid dateRange')
  }
}

const dateRangeName = {
  [WEEK1]: '1-week',
  [MONTH1]: '1-month',
  [MONTH3]: '3-month',
  [YEAR1]: '1-year'
}

@Module({
  name: 'charts',
  stateFactory: true,
  namespaced: true
})
export default class ChartsModule extends VuexModule {
  private chartData: ChartData = {
    totalCaloriesBurned: [],
    totalDistanceRun: [],
    totalTimeExercising: []
  }

  public get getTotalCaloriesBurned() {
    return (date: Date, dateRange: DateRange) =>
      getFilteredChartData(this.chartData.totalCaloriesBurned, date, dateRange)
  }

  public get getTotalDistanceRun() {
    return (date: Date, dateRange: DateRange) =>
      getFilteredChartData(this.chartData.totalDistanceRun, date, dateRange)
  }

  public get getTotalTimeExercising() {
    return (date: Date, dateRange: DateRange) =>
      getFilteredChartData(this.chartData.totalTimeExercising, date, dateRange)
  }

  @Mutation
  private unionChartData(chartData: ChartData) {
    Object.entries(this.chartData).forEach(
      ([k, v]) => (this.chartData[k] = unionBy(chartData[k], v, property('x')))
    )
  }

  @Action({ rawError: true })
  public async fetchChartData(date: Date, dateRange: DateRange) {
    const { data } = await $axios.get<ChartData>(
      `/api/chart/${dateRangeName[dateRange]}/${moment(date).format(
        'YYYY-MM-DD'
      )}`
    )
    this.unionChartData(data)
  }
}
