<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab v-for="tabItem in tabItems" :key="tabItem" class="mr-4">
        {{ tabItem }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <aggregate-tab />
      </v-tab-item>
      <v-tab-item>
        <all-data-tab />
      </v-tab-item>
      <v-tab-item>a</v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AggregateStore, SnackbarModule } from '~/store'
import AggregateTab from '~/components/organism/Report/AggregateTab.vue'
import AllDataTab from '~/components/organism/Report/AllDataTab.vue'

export default Vue.extend({
  components: {
    AggregateTab,
    AllDataTab
  },
  async asyncData({ $sentry }): Promise<void> {
    try {
      await AggregateStore.fetch()
    } catch (e) {
      $sentry.captureException(e)
      SnackbarModule.error({
        message: 'データの取得に失敗しました。'
      })
    }
  },
  data() {
    return {
      tab: null,
      tabItems: ['集計', '運動履歴', '分析']
    }
  },
  head() {
    return {
      title: 'レポート'
    }
  }
})
</script>
