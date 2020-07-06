/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Snackbar from '~/store/snackbar'
import RecordsModule from '~/store/records'
import SettingModule from '~/store/setting'

let SnackbarModule: Snackbar
let RecordsStore: RecordsModule
let SettingStore: SettingModule
function initialiseStores(store: Store<any>): void {
  SnackbarModule = getModule(Snackbar, store)
  RecordsStore = getModule(RecordsModule, store)
  SettingStore = getModule(SettingModule, store)
}

export { initialiseStores, SnackbarModule, RecordsStore, SettingStore }
