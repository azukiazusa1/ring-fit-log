<template>
  <v-app>
    <app-snackbar></app-snackbar>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        v-for="(item, key) in items"
        :key="key"
        :to="item.to"
        class="d-none d-md-flex"
        text
      >
        <v-icon small>{{ item.icon }}</v-icon>
        <span>{{ item.title }}</span>
      </v-btn>
      <avator-menu :user="user" @logout="logout"></avator-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation class="d-md-none">
      <v-btn v-for="(item, key) in items" :key="key" :to="item.to">
        <span>{{ item.title }}</span>
        <v-icon small>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AvatorMenu from '~/components/AvatorMenu.vue'
import AppSnackbar from '~/components/AppSnackbar.vue'
import getLoginUser from '~/utils/getLoginUser'
import { SnackbarModule } from '~/store'

type Item = {
  icon: string
  title: string
  to: string
}

type DataType = {
  items: Array<Item>
  title: string
}

export default Vue.extend({
  components: {
    AvatorMenu,
    AppSnackbar
  },
  data(): DataType {
    return {
      items: [
        {
          icon: 'fas fa-pen',
          title: '記録する',
          to: '/chart'
        },
        {
          icon: 'fa fa-chart-line',
          title: 'グラフ',
          to: '/chart'
        }
      ],
      title: 'Vuetify.js'
    }
  },
  computed: {
    user() {
      return getLoginUser(this.$auth)
    }
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        SnackbarModule.info({
          message: 'ログアウトしました。'
        })
        this.$router.push('/')
        this.$cookies.remove('uid')
      } catch {
        SnackbarModule.error({
          message: 'ログアウトに失敗しました。'
        })
      }
    }
  }
})
</script>
