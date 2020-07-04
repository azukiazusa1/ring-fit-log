import { isEqual, reduce } from 'lodash'
import toJSON from '~/utils/toJSON'
import { Record } from '~/types/record'

const records: Record[] = [
  {
    totalTimeExercising: '00:20:02',
    totalCaloriesBurned: 24.24,
    totalDistanceRun: 1.5,
    date: new Date('2020-7-1'),
    stamps: {
      arms: true,
      stomach: false,
      legs: true,
      yoga: false
    }
  },
  {
    totalTimeExercising: '00:30:32',
    totalCaloriesBurned: 32.32,
    totalDistanceRun: 4.53,
    date: new Date('2020-7-2'),
    stamps: {
      arms: true,
      stomach: true,
      legs: false,
      yoga: false
    }
  },
  {
    totalTimeExercising: '00:10:24',
    totalCaloriesBurned: 8.23,
    totalDistanceRun: null,
    date: new Date('2020-7-3'),
    stamps: {
      arms: false,
      stomach: false,
      legs: false,
      yoga: true
    }
  }
]

describe('utils/toJSON', () => {
  describe('dateプロパティをもつオブジェクトを渡したとき', () => {
    let obj: any
    const record = records[0]
    beforeEach(() => {
      obj = toJSON(record)
    })

    test('dateプロパティを持っている場合、フォーマットして返す', () => {
      expect(obj.date).toEqual('2020-07-01T00:00:00+09:00')
    })

    test('dateプロパティ以外はすべて同じ', () => {
      const diff = reduce(
        record,
        (result, value, key) => {
          return isEqual(value, obj[key]) ? result : result.concat(key)
        },
        [] as string[]
      )
      expect(diff).toEqual(['date'])
    })
  })

  describe('dateプロパティを持つオブジェクトの配列を渡したとき', () => {
    let array: Record[]
    beforeEach(() => {
      array = records.map((r) => toJSON(r))
    })

    test('すべてのオブジェクトの日付がフォーマットされる', () => {
      expect(array[0].date).toEqual('2020-07-01T00:00:00+09:00')
      expect(array[1].date).toEqual('2020-07-02T00:00:00+09:00')
      expect(array[2].date).toEqual('2020-07-03T00:00:00+09:00')
    })
  })
})
