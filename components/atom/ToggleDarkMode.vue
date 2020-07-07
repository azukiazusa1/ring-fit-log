<template>
  <v-switch
    v-model="isDarkTheme"
    label="ダークモード"
    hint="アプリケーション全体にダークモードを適用します。"
    persistent-hint
  ></v-switch>
</template>

<script lang="ts">
import Vue from 'vue'
import { DARK, LIGHT, THEME_COOKIE_KEY } from '~/config/constant'

type Theme = 'dark' | 'light'

export default Vue.extend({
  name: 'ToggleDarkTheme',
  computed: {
    isDarkTheme: {
      get(): boolean {
        return this.$vuetify.theme.dark
      },
      set(dark: boolean) {
        this.$vuetify.theme.dark = dark
        if (dark) {
          this.localTheme = DARK
        } else {
          this.localTheme = LIGHT
        }
      }
    },
    localTheme: {
      get(): string | undefined {
        return this.$cookies.get(THEME_COOKIE_KEY)
      },
      set(theme: Theme) {
        this.$cookies.set(THEME_COOKIE_KEY, theme)
      }
    }
  }
})
</script>
