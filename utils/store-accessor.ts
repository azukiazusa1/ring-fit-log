/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Snackbar from '~/store/snackbar'

let SnackbarModule: Snackbar
function initialiseStores(store: Store<any>): void {
  SnackbarModule = getModule(Snackbar, store)
}

export { initialiseStores, SnackbarModule }
