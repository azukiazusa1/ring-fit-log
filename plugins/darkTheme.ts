import { Plugin } from '@nuxt/types'
import { DARK, LIGHT, THEME_COOKIE_KEY } from '~/config/constant'

const darkTheme: Plugin = ({ $vuetify, app }) => {
  const localTheme = app.$cookies.get(THEME_COOKIE_KEY)
  if (localTheme === LIGHT) {
    $vuetify.theme.dark = false
  } else if (localTheme === DARK) {
    $vuetify.theme.dark = true
  } else {
    $vuetify.theme.dark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
  }
}

export default darkTheme
