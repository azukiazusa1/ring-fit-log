import { Plugin } from '@nuxt/types'
import createPersistedState from 'vuex-persistedstate'

const localStorage: Plugin = ({ store }) => {
  createPersistedState({
    paths: ['setting']
  })(store)
}

export default localStorage
