import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import moment from 'moment'
import { unionBy, property } from 'lodash'
import { ChartPoint } from 'chart.js'
import { $axios } from '~/utils/api'
import { ChartData, DateRange } from '~/types/chart'
import { WEEK1, MONTH1, MONTH3, YEAR1 } from '~/config/constant'

export const getFilteredChartData = (
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
  private daylyChartData: ChartData = {
    totalCaloriesBurned: [],
    totalDistanceRun: [],
    totalTimeExercising: []
  }

  private weeklyChartData: ChartData = {
    totalCaloriesBurned: [],
    totalDistanceRun: [],
    totalTimeExercising: []
  }

  private monthlyChartData: ChartData = {
    totalCaloriesBurned: [],
    totalDistanceRun: [],
    totalTimeExercising: []
  }

  public get getDaylyChartData() {
    return this.daylyChartData
  }

  public get getWeeklyChartData() {
    return this.weeklyChartData
  }

  public get getMonthlyChartData() {
    return this.monthlyChartData
  }

  private get getChartData() {
    return (dateRange: DateRange) => {
      switch (dateRange) {
        case WEEK1:
        case MONTH1:
          return this.daylyChartData
        case MONTH3:
          return this.weeklyChartData
        case YEAR1:
          return this.monthlyChartData
      }
    }
  }

  public get getTotalCaloriesBurned() {
    return (date: Date, dateRange: DateRange) =>
      getFilteredChartData(
        this.getChartData(dateRange).totalCaloriesBurned,
        date,
        dateRange
      )
  }

  public get getTotalDistanceRun() {
    return (date: Date, dateRange: DateRange) =>
      getFilteredChartData(
        this.getChartData(dateRange).totalDistanceRun,
        date,
        dateRange
      )
  }

  public get getTotalTimeExercising() {
    return (date: Date, dateRange: DateRange) =>
      getFilteredChartData(
        this.getChartData(dateRange).totalTimeExercising,
        date,
        dateRange
      )
  }

  @Mutation
  private unionDaylyChartData(chartData: ChartData) {
    Object.entries(this.daylyChartData).forEach(
      ([k, v]) =>
        (this.daylyChartData[k] = unionBy(chartData[k], v, property('x')))
    )
  }

  @Mutation
  private unionWeeklyChartData(chartData: ChartData) {
    Object.entries(this.weeklyChartData).forEach(
      ([k, v]) =>
        (this.weeklyChartData[k] = unionBy(chartData[k], v, property('x')))
    )
  }

  @Mutation
  private unionMonthlyChartData(chartData: ChartData) {
    Object.entries(this.monthlyChartData).forEach(
      ([k, v]) =>
        (this.monthlyChartData[k] = unionBy(chartData[k], v, property('x')))
    )
  }

  @Action({ rawError: true })
  public async fetchChartData({
    date,
    dateRange
  }: {
    date: Date
    dateRange: DateRange
  }) {
    const { data } = await $axios.get<ChartData>(
      `/api/chart/${dateRangeName[dateRange]}/${moment(date).format(
        'YYYY-MM-DD'
      )}`
    )

    switch (dateRange) {
      case WEEK1:
      case MONTH1:
        this.unionDaylyChartData(data)
        break
      case MONTH3:
        this.unionWeeklyChartData(data)
        break
      case YEAR1:
        this.unionMonthlyChartData(data)
        break
    }
  }
}
