/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Snackbar from '~/store/snackbar'
import RecordsModule from '~/store/records'
import ChartsModule from '~/store/charts'
import AggregateModule from '~/store/aggregate'
import SettingModule from '~/store/setting'
import TimelinesModule from '~/store/timelines'

let SnackbarModule: Snackbar
let RecordsStore: RecordsModule
let ChartsStore: ChartsModule
let AggregateStore: AggregateModule
let SettingStore: SettingModule
let TimlinesStore: TimelinesModule
function initialiseStores(store: Store<any>): void {
  SnackbarModule = getModule(Snackbar, store)
  RecordsStore = getModule(RecordsModule, store)
  ChartsStore = getModule(ChartsModule, store)
  AggregateStore = getModule(AggregateModule, store)
  SettingStore = getModule(SettingModule, store)
  TimelinesModule = getModule(TimelinesModule, store)
}

export {
  initialiseStores,
  SnackbarModule,
  RecordsStore,
  ChartsStore,
  AggregateStore,
  SettingStore,
  TimelinesModule
}
