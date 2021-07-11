import { createStore } from '~/.nuxt/store'
import { $axios } from '~/utils/api'
import { initialiseStores, TimelinesStore } from '~/utils/store-accessor'

jest.mock('~/utils/api', () => ({
  $axios: {
    get: jest.fn((url: string) => {
      const data = require(`~/test/fixture/${url}/index.json`)
      return Promise.resolve({ data })
    })
  }
}))

describe('store/timeline', () => {
  beforeEach(() => {
    initialiseStores(createStore())
  })

  describe('Action', () => {
    describe('fetchTiemlines', () => {
      test('タイムラインを取得する', async () => {
        await TimelinesStore.fetchTimelines({})
        expect(TimelinesStore.getTimelines.length).toEqual(3)
        expect(TimelinesStore.getPaginate).toBeDefined()
        expect($axios.get).toHaveBeenCalledWith('/api/timelines', {
          params: {
            page: 1,
            limit: 10
          }
        })
      })

      test('ページを指定', async () => {
        await TimelinesStore.fetchTimelines({ page: 2 })
        expect($axios.get).toHaveBeenCalledWith('/api/timelines', {
          params: {
            page: 2,
            limit: 10
          }
        })
      })

      test('limitを指定', async () => {
        await TimelinesStore.fetchTimelines({ limit: 15 })
        expect($axios.get).toHaveBeenCalledWith('/api/timelines', {
          params: {
            page: 1,
            limit: 15
          }
        })
      })
    })

    test('storeをクリアする', async () => {
      await TimelinesStore.fetchTimelines({})
      expect(TimelinesStore.getTimelines.length).toEqual(3)
      expect(TimelinesStore.getPaginate).toBeDefined()
      TimelinesStore.clear()
      expect(TimelinesStore.getTimelines.length).toEqual(0)
      expect(TimelinesStore.getPaginate).toBeNull()
    })
  })
})
