/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Snackbar from '~/store/snackbar'
import RecordsModule from '~/store/records'

let SnackbarModule: Snackbar
let RecordsStore: RecordsModule
function initialiseStores(store: Store<any>): void {
  SnackbarModule = getModule(Snackbar, store)
  RecordsStore = getModule(RecordsModule, store)
}

export { initialiseStores, SnackbarModule, RecordsStore }
