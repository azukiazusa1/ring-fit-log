<template>
  <v-app>
    <app-snackbar></app-snackbar>
    <v-app-bar fixed app color="main" dark>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <span v-for="(item, key) in items" :key="key" class="d-none d-md-flex">
        <NavItem
          :title="item.title"
          :icon="item.icon"
          :to="item.to"
          prepend-icon
          text
        ></NavItem>
      </span>
      <avator-menu :user="user" @logout="logout"></avator-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation class="d-md-none">
      <template v-for="(item, key) in items">
        <NavItem
          :key="key"
          :title="item.title"
          :icon="item.icon"
          :to="item.to"
        ></NavItem>
      </template>
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AvatorMenu from '~/components/molecule/AvatorMenu.vue'
import AppSnackbar from '~/components/organism/AppSnackbar.vue'
import NavItem from '~/components/atom/NavItem.vue'
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
    AppSnackbar,
    NavItem
  },
  data(): DataType {
    return {
      items: [
        {
          icon: 'fas fa-pen',
          title: '記録する',
          to: '/record'
        },
        {
          icon: 'fas fa-calendar',
          title: 'カレンダー',
          to: '/calendar'
        },
        {
          icon: 'fa fa-chart-line',
          title: 'グラフ',
          to: '/chart'
        },
        {
          icon: 'fa fa-cog',
          title: '設定',
          to: '/setting'
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
