/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Snackbar from '~/store/snackbar'
import RecordsModule from '~/store/records'
import Todos from '~/store/todo'

let SnackbarModule: Snackbar
let RecordsStore: RecordsModule
let TodoStore: Todos
function initialiseStores(store: Store<any>): void {
  SnackbarModule = getModule(Snackbar, store)
  RecordsStore = getModule(RecordsModule, store)
  TodoStore = getModule(Todos, store)
}

export { initialiseStores, SnackbarModule, RecordsStore, TodoStore }
