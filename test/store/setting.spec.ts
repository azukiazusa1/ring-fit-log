import { createStore } from '~/.nuxt/store'
import { initialiseStores, SettingStore } from '~/utils/store-accessor'
import { SUNDAY, MONDAY } from '~/config/constant'

describe('store/record', () => {
  beforeEach(() => {
    initialiseStores(createStore())
  })

  describe('initial state', () => {
    test('カレンダーの最初の曜日の初期値は日曜日', () => {
      expect(SettingStore.getFirstDayOfWeek).toEqual(SUNDAY)
    })

    test('カレンダーの色の初期値', () => {
      expect(SettingStore.getCalandarColor).toEqual('#ffbb00')
    })
  })

  describe('Actions', () => {
    test('changeFirstDayOfWeek', () => {
      SettingStore.changeFirstDayOfWeek(MONDAY)
      expect(SettingStore.getFirstDayOfWeek).toEqual(MONDAY)
    })

    test('changeCalendarColor', () => {
      SettingStore.changeCalandarColor('#ffffff')
      expect(SettingStore.getCalandarColor).toEqual('#ffffff')
    })
  })
})
