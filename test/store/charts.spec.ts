import { isEmpty } from 'lodash'
import { ChartPoint } from 'chart.js'
import { createStore } from '~/.nuxt/store'
import { initialiseStores, ChartsStore } from '~/utils/store-accessor'
import { getFilteredChartData } from '~/store/charts'
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

    describe('同じ日付のデータは上書きされる', () => {
      const dateRange = WEEK1
      test('同じ日付のデータを取得', async () => {
        await ChartsStore.fetchChartData({
          date: new Date('2020-07-01'),
          dateRange
        })

        const oldData = ChartsStore.getDaylyChartData.totalCaloriesBurned.find(
          (v) => v.x === '2020-07-07'
        )

        expect(oldData!.y).toEqual(39.8)

        await ChartsStore.fetchChartData({
          date: new Date('2020-07-07'),
          dateRange
        })

        const newData = ChartsStore.getDaylyChartData.totalCaloriesBurned.find(
          (v) => v.x === '2020-07-07'
        )

        expect(newData!.y).toEqual(29.7)
        expect(
          ChartsStore.getDaylyChartData.totalCaloriesBurned.length
        ).toEqual(11)
      })
    })
  })

  describe('Getters', () => {
    describe('日付と範囲を指定して、データを返す', () => {
      const date = new Date('2020-07-08')
      describe('日付の範囲が1週間', () => {
        const dateRange = WEEK1
        const data: ChartPoint[] = [
          {
            x: '2020-07-07',
            y: 10
          },
          {
            x: '2020-07-08',
            y: 20
          },
          {
            x: '2020-07-10',
            y: 30
          },
          {
            x: '2020-07-15',
            y: 40
          },
          {
            x: '2020-07-16',
            y: 50
          }
        ]

        test('2020-07-08から1週間分のデータを返す', () => {
          expect(getFilteredChartData(data, date, dateRange).length).toEqual(3)
        })
      })

      describe('日付の範囲が1ヶ月', () => {
        const dateRange = MONTH1
        const data: ChartPoint[] = [
          {
            x: '2020-06-30',
            y: 10
          },
          {
            x: '2020-07-01',
            y: 20
          },
          {
            x: '2020-07-15',
            y: 30
          },
          {
            x: '2020-07-31',
            y: 40
          },
          {
            x: '2020-08-01',
            y: 50
          }
        ]

        test('2020-07-08の月のデータを返す', () => {
          expect(getFilteredChartData(data, date, dateRange).length).toEqual(3)
        })
      })

      describe('日付の範囲が3ヶ月', () => {
        const dateRange = MONTH3
        const data: ChartPoint[] = [
          {
            x: '2020-06-30',
            y: 10
          },
          {
            x: '2020-07-01',
            y: 20
          },
          {
            x: '2020-08-01',
            y: 30
          },
          {
            x: '2020-09-01',
            y: 40
          },
          {
            x: '2020-09-30',
            y: 50
          },
          {
            x: '2020-10-01',
            y: 60
          }
        ]

        test('2020-07-08の月から3ヶ月のデータを返す', () => {
          expect(getFilteredChartData(data, date, dateRange).length).toEqual(4)
        })
      })

      describe('日付の範囲が1年', () => {
        const dateRange = YEAR1
        const data: ChartPoint[] = [
          {
            x: '2019-12-31',
            y: 10
          },
          {
            x: '2020-01-01',
            y: 20
          },
          {
            x: '2020-07-08',
            y: 30
          },
          {
            x: '2020-12-31',
            y: 40
          },
          {
            x: '2021-01-01',
            y: 50
          }
        ]

        test('2020-07-08の月から3ヶ月のデータを返す', () => {
          expect(getFilteredChartData(data, date, dateRange).length).toEqual(3)
        })
      })
    })
  })
})
