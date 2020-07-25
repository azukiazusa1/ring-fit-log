import { isEmpty } from 'lodash'
import { createStore } from '~/.nuxt/store'
import { initialiseStores, ChartsStore } from '~/utils/store-accessor'
import { WEEK1, MONTH1, MONTH3, YEAR1 } from '~/config/constant'
import { $axios } from '~/utils/api'
import { ChartData } from '~/types/chart'

let mockEmpty = false
const baseUrl = '/api/chart'
const isEmptyChartData = (chartData: ChartData) => {
  return Object.values(chartData).every((v) => isEmpty(v))
}

jest.mock('~/utils/api', () => ({
  $axios: {
    get: jest.fn((url: string) => {
      if (mockEmpty) {
        const emptyData: ChartData = {
          totalCaloriesBurned: [],
          totalDistanceRun: [],
          totalTimeExercising: []
        }
        return Promise.resolve({ data: emptyData })
      }

      const data = require(`~/test/fixture${url}.json`)
      return Promise.resolve({ data })
    })
  }
}))

describe('store/charts', () => {
  beforeEach(() => {
    initialiseStores(createStore())
    mockEmpty = false
  })

  describe('Actions', () => {
    describe('日付の範囲が1週間', () => {
      const date = new Date('2020-07-01')
      const dateRange = WEEK1
      beforeEach(async () => {
        await ChartsStore.fetchChartData({ date, dateRange })
      })
      test('正しいエンドポイントを叩いているか', () => {
        expect($axios.get).toHaveBeenCalledWith(`${baseUrl}/1-week/2020-07-01`)
      })

      test('daylyChartData stateにデータが統合される', () => {
        expect(isEmptyChartData(ChartsStore.getDaylyChartData)).toBeFalsy()
      })
    })

    describe('日付の範囲が1ヶ月', () => {
      const date = new Date('2020-07-01')
      const dateRange = MONTH1
      beforeEach(async () => {
        await ChartsStore.fetchChartData({ date, dateRange })
      })
      test('正しいエンドポイントを叩いているか', () => {
        expect($axios.get).toHaveBeenCalledWith(`${baseUrl}/1-month/2020-07-01`)
      })

      test('DaylyChartData stateにデータが統合される', () => {
        expect(isEmptyChartData(ChartsStore.getDaylyChartData)).toBeFalsy()
      })
    })

    describe('日付の範囲が3ヶ月', () => {
      const date = new Date('2020-07-01')
      const dateRange = MONTH3
      beforeEach(async () => {
        await ChartsStore.fetchChartData({ date, dateRange })
      })

      test('正しいエンドポイントを叩いているか', () => {
        expect($axios.get).toHaveBeenCalledWith(`${baseUrl}/3-month/2020-07-01`)
      })

      test('weeklyChartData stateにデータが統合される', () => {
        expect(isEmptyChartData(ChartsStore.getWeeklyChartData)).toBeFalsy()
      })
    })

    describe('日付の範囲が1年', () => {
      const date = new Date('2020-07-01')
      const dateRange = YEAR1
      beforeEach(async () => {
        await ChartsStore.fetchChartData({ date, dateRange })
      })

      test('正しいエンドポイントを叩いているか', () => {
        expect($axios.get).toHaveBeenCalledWith(`${baseUrl}/1-year/2020-07-01`)
      })

      test('MonthlyChartData stateにデータが統合される', () => {
        expect(isEmptyChartData(ChartsStore.getMonthlyChartData)).toBeFalsy()
      })
    })
  })
})
