import { createStore } from '~/.nuxt/store'
import { initialiseStores, SnackbarModule } from '~/utils/store-accessor'

describe('SnackbarModule', () => {
  beforeEach(() => {
    initialiseStores(createStore())
  })

  describe('Actions', () => {
    test('SetSnacbar: messageとtypeだけ指定', () => {
      SnackbarModule.setSnackbar({
        message: 'テスト',
        type: 'info'
      })
      expect(SnackbarModule.getMessage).toEqual('テスト')
      expect(SnackbarModule.getType).toEqual('info')
      expect(SnackbarModule.isEscape).toEqual(false)
      expect(SnackbarModule.isTop).toEqual(false)
      expect(SnackbarModule.isRight).toEqual(false)
      expect(SnackbarModule.isLeft).toEqual(false)
      expect(SnackbarModule.isBottom).toEqual(false)
      expect(SnackbarModule.getTimeout).toEqual(3000)
    })
    test('SetSnacbar: オプションも指定', () => {
      SnackbarModule.setSnackbar({
        message: 'テスト',
        type: 'info',
        escape: true,
        top: true,
        right: true,
        left: true,
        bottom: true,
        timeout: 1000
      })
      expect(SnackbarModule.isAppear).toEqual(true)
      expect(SnackbarModule.getMessage).toEqual('テスト')
      expect(SnackbarModule.getType).toEqual('info')
      expect(SnackbarModule.isEscape).toEqual(true)
      expect(SnackbarModule.isTop).toEqual(true)
      expect(SnackbarModule.isRight).toEqual(true)
      expect(SnackbarModule.isLeft).toEqual(true)
      expect(SnackbarModule.isBottom).toEqual(true)
      expect(SnackbarModule.getTimeout).toEqual(1000)
    })

    test('infoアクション', () => {
      SnackbarModule.info({
        message: 'infoアクション'
      })
      expect(SnackbarModule.isAppear).toEqual(true)
      expect(SnackbarModule.getMessage).toEqual('infoアクション')
      expect(SnackbarModule.getType).toEqual('info')
    })

    test('errorアクション', () => {
      SnackbarModule.error({
        message: 'errorアクション'
      })
      expect(SnackbarModule.isAppear).toEqual(true)
      expect(SnackbarModule.getMessage).toEqual('errorアクション')
      expect(SnackbarModule.getType).toEqual('error')
    })

    test('warningアクション', () => {
      SnackbarModule.warning({
        message: 'warningアクション'
      })
      expect(SnackbarModule.isAppear).toEqual(true)
      expect(SnackbarModule.getMessage).toEqual('warningアクション')
      expect(SnackbarModule.getType).toEqual('warning')
    })

    test('successアクション', () => {
      SnackbarModule.success({
        message: 'successアクション'
      })
      expect(SnackbarModule.isAppear).toEqual(true)
      expect(SnackbarModule.getMessage).toEqual('successアクション')
      expect(SnackbarModule.getType).toEqual('success')
    })

    test('closeアクション', () => {
      SnackbarModule.info({
        message: 'infoアクション'
      })
      expect(SnackbarModule.isAppear).toEqual(true)
      SnackbarModule.close()
      expect(SnackbarModule.isAppear).toEqual(false)
    })
  })
})
