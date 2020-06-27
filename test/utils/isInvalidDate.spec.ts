import isInvalidDate from '~/utils/isInvalidDate'

describe('utils/isValidDate', () => {
  describe('正しい日付', () => {
    test('string型を渡す', () => {
      expect(isInvalidDate('2020-7-1')).toEqual(false)
    })
    test('日付型を渡す', () => {
      const value = new Date('2002-7-1')
      expect(isInvalidDate(value)).toEqual(false)
    })
  })
  describe('間違った日付', () => {
    test('string型を渡す', () => {
      expect(isInvalidDate('2020-13-13')).toEqual(true)
    })
    test('日付型を渡す', () => {
      expect(isInvalidDate(new Date('2020-13-13'))).toEqual(true)
    })
  })
})
