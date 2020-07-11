import { createStore } from '~/.nuxt/store'
import { initialiseStores, RecordsStore } from '~/utils/store-accessor'
import { Record } from '~/types/record'

let mockEmpty = false

jest.mock('~/utils/api', () => ({
  $axios: {
    get: jest.fn((url: string) => {
      if (mockEmpty) {
        return Promise.resolve({ date: {} })
      }
      const data = require(`~/test/fixture/${url}`)
      return Promise.resolve({ data })
    }),
    post: jest.fn((_url: string, data: Record) => Promise.resolve({ data })),
    put: jest.fn((_url: string, data: Record) => Promise.resolve({ data })),
    delete: jest.fn((_id: string) => Promise.resolve({}))
  }
}))

describe('store/record', () => {
  beforeEach(() => {
    initialiseStores(createStore())
    mockEmpty = false
  })

  describe('Action', () => {
    describe('fetchRecords', () => {
      test('すべてのレコードを取得する', async () => {
        await RecordsStore.fetchRecords()
        expect(RecordsStore.getRecords.length).toEqual(4)
      })

      test('レスポンスが空のときは何もしない', async () => {
        mockEmpty = true
        await RecordsStore.fetchRecords()
        expect(RecordsStore.getRecords.length).toEqual(0)
      })
    })

    describe('fetchRecord', () => {
      test('日付を指定してレコードを一つ取得', async () => {
        const date = new Date('2020-7-1')
        await RecordsStore.fetchRecord(date)
        expect(RecordsStore.getRecords.length).toEqual(1)
        expect(RecordsStore.isRecoded(date)).toEqual(true)
      })

      test('レスポンスが空のときはなにもしない', async () => {
        const date = new Date('2020-9-1')
        await RecordsStore.fetchRecord(date)
        expect(RecordsStore.getRecords.length).toEqual(0)
        expect(RecordsStore.isRecoded(date)).toEqual(false)
      })
    })

    describe('createRecord', () => {
      test('新しいレコードを追加する', async () => {
        const record: Record = {
          _id: '',
          totalTimeExercising: '01:40:32',
          totalCaloriesBurned: 40.4,
          totalDistanceRun: 1.77,
          date: '2020-07-05T00:00:00+09:00',
          stamps: {
            arms: true,
            stomach: true,
            legs: true,
            yoga: false
          },
          userId: ''
        }
        await RecordsStore.createRecord(record)
        expect(RecordsStore.getRecords.length).toEqual(1)
        expect(RecordsStore.getRecords[0]).toEqual(record)
      })
    })

    describe('updateRecord', () => {
      beforeEach(async () => {
        await RecordsStore.fetchRecords()
      })

      test('レコードを更新する', async () => {
        const oldData = RecordsStore.getRecords[0]
        const oldLength = RecordsStore.getRecords.length
        const newData: Record = {
          _id: '1',
          totalTimeExercising: '01:40:32',
          totalCaloriesBurned: 40.4,
          totalDistanceRun: 1.77,
          date: '2020-07-01T00:00:00+09:00',
          stamps: {
            arms: true,
            stomach: true,
            legs: true,
            yoga: false
          },
          userId: 'jfalfjafhaffj'
        }
        await RecordsStore.updateRecord(newData, newData._id)
        expect(RecordsStore.getRecords[0]).not.toEqual(oldData)
        expect(RecordsStore.getRecords[0]).toEqual(newData)
        expect(RecordsStore.getRecords.length).toEqual(oldLength)
      })
    })

    describe('deleteRecord', () => {
      beforeEach(async () => {
        await RecordsStore.fetchRecords()
      })

      test('レコードを削除する', async () => {
        await RecordsStore.deleteRecord('1')
        expect(RecordsStore.getRecords.length).toEqual(3)
        expect(
          RecordsStore.getRecordByDate(new Date('2002-7-1'))
        ).toBeUndefined()
      })
    })
  })

  describe('Getters', () => {
    beforeEach(async () => {
      await RecordsStore.fetchRecords()
    })

    describe('getRecordByDate', () => {
      test('同じ日付のレコードを返す', () => {
        const record = RecordsStore.getRecordByDate(new Date('2020-7-1'))
        expect(record).toBeTruthy()
        expect(record?.date).toEqual('2020-07-01T00:00:00+09:00')
      })

      test('存在しない日付のときはundefinedを返す', () => {
        const record = RecordsStore.getRecordByDate(new Date('2020-9-1'))
        expect(record).toBeUndefined()
      })
    })

    describe('isRecorded', () => {
      test('渡した日付のレコードが存在する場合trueを返す', () => {
        expect(RecordsStore.isRecoded(new Date('2020-7-1'))).toEqual(true)
      })

      test('渡した日付のレコードが存在しない場合falseを返す', () => {
        expect(RecordsStore.isRecoded(new Date('2020-9-1'))).toEqual(false)
      })
    })
  })
})
