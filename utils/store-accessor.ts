/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Snackbar from '~/store/snackbar'
import RecordsModule from '~/store/records'
import ChartsModule from '~/store/charts'
import SettingModule from '~/store/setting'

let SnackbarModule: Snackbar
let RecordsStore: RecordsModule
let ChartsStore: ChartsModule
let SettingStore: SettingModule
function initialiseStores(store: Store<any>): void {
  SnackbarModule = getModule(Snackbar, store)
  RecordsStore = getModule(RecordsModule, store)
  ChartsStore = getModule(ChartsModule, store)
  SettingStore = getModule(SettingModule, store)
}

export {
  initialiseStores,
  SnackbarModule,
  RecordsStore,
  ChartsStore,
  SettingStore
}
