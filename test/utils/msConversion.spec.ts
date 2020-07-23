import { ms2stringTime, stringTime2ms } from '~/utils/msConversion'

describe('utils/msConversion', () => {
  describe('ミリ秒をHH:mm:ss形式に変換', () => {
    test('数字でミリ秒を渡す', () => {
      expect(ms2stringTime(1202000)).toEqual('00:20:02')
      expect(ms2stringTime(5622000)).toEqual('01:33:42')
    })

    test('文字列でミリ秒を渡す', () => {
      expect(ms2stringTime('1202000')).toEqual('00:20:02')
      expect(ms2stringTime('5622000')).toEqual('01:33:42')
    })

    test('不正な文字列を渡す', () => {
      expect(ms2stringTime('abc')).toEqual('')
    })

    test('nullを渡す', () => {
      expect(ms2stringTime(null)).toEqual('')
    })
  })

  describe('HH:mm:ss形式をミリ秒に変換', () => {
    test('正しい形式で渡す', () => {
      expect(stringTime2ms('00:20:02')).toEqual(1202000)
      expect(stringTime2ms('01:33:42')).toEqual(5622000)
    })

    test('不正な形式で渡す', () => {
      expect(stringTime2ms('abc')).toEqual(null)
    })
  })
})
