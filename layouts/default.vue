<template>
  <v-app>
    <AppSnackbar />
    <AppHeader :items="items" :title="title" />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <AppFooter :items="items" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppSnackbar from '~/components/organism/AppSnackbar.vue'
import AppHeader from '~/components/organism/AppHeader.vue'
import AppFooter from '~/components/organism/AppFooter.vue'
import { Item } from '~/types/index'

type DataType = {
  items: Array<Item>
  title: string
}

export default Vue.extend({
  components: {
    AppSnackbar,
    AppHeader,
    AppFooter
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
      title: 'リングフィットログ'
    }
  }
})
</script>
