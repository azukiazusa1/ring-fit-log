import { createStore } from '~/.nuxt/store'
import { initialiseStores, SnackbarModule } from '~/utils/store-accessor'

describe('SnackbarModule', () => {
  beforeEach(() => {
    initialiseStores(createStore())
  })

  describe('Actions', () => {
    test('SetSnacbar: messageとtypeだけ指定', async () => {
      await SnackbarModule.setSnackbar({
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
    test('SetSnacbar: オプションも指定', async () => {
      await SnackbarModule.setSnackbar({
        message: 'テスト',
        type: 'info',
        escape: true,
        top: true,
        right: true,
        left: true,
        bottom: true,
        timeout: 1000
      })
      expect(SnackbarModule.getMessage).toEqual('テスト')
      expect(SnackbarModule.getType).toEqual('info')
      expect(SnackbarModule.isEscape).toEqual(true)
      expect(SnackbarModule.isTop).toEqual(true)
      expect(SnackbarModule.isRight).toEqual(true)
      expect(SnackbarModule.isLeft).toEqual(true)
      expect(SnackbarModule.isBottom).toEqual(true)
      expect(SnackbarModule.getTimeout).toEqual(1000)
    })
  })

  test('infoアクション', async () => {
    await SnackbarModule.info({
      message: 'infoアクション'
    })
    expect(SnackbarModule.getMessage).toEqual('infoアクション')
    expect(SnackbarModule.getType).toEqual('info')
  })

  test('errorアクション', async () => {
    await SnackbarModule.error({
      message: 'errorアクション'
    })
    expect(SnackbarModule.getMessage).toEqual('errorアクション')
    expect(SnackbarModule.getType).toEqual('error')
  })

  test('warningアクション', async () => {
    await SnackbarModule.warning({
      message: 'warningアクション'
    })
    expect(SnackbarModule.getMessage).toEqual('warningアクション')
    expect(SnackbarModule.getType).toEqual('warning')
  })

  test('successアクション', async () => {
    await SnackbarModule.success({
      message: 'successアクション'
    })
    expect(SnackbarModule.getMessage).toEqual('successアクション')
    expect(SnackbarModule.getType).toEqual('success')
  })
})
