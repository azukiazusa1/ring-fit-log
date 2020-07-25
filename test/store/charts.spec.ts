import { createStore } from '~/.nuxt/store'
import { initialiseStores, ChartsStore } from '~/utils/store-accessor'
import { WEEK1, MONTH1, MONTH3, YEAR1 } from '~/config/constant'
import { $axios } from '~/utils/api'
import { ChartData } from '~/types/chart'

let mockEmpty = false
const baseUrl = '/api/chart'

jest.mock('~/utils/api', () => ({
  $axios: {
    get: jest.fn((url: string) => {
      const data: ChartData = {
        totalCaloriesBurned: [],
        totalDistanceRun: [],
        totalTimeExercising: []
      }
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
      beforeEach(async () => {
        await ChartsStore.fetchChartData({
          date: new Date('2020-07-01'),
          dateRange: WEEK1
        })
      })
      test('正しいエンドポイントを叩いているか', () => {
        expect($axios.get).toHaveBeenCalledWith(`${baseUrl}/1-week/2020-07-01`)
      })
    })
  })
})
