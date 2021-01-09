<template>
  <div>
    集計
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AggregateStore, SettingStore, SnackbarModule } from '~/store'

export default Vue.extend({
  async asyncData({ app, query, $moment }): Promise<Data> {
    try {
      await AggregateStore.fetch()
    } catch (e) {
      SnackbarModule.error({
        message: 'データの取得に失敗しました。'
      })
    }
  },
  head() {
    return {
      title: '集計'
    }
  },
})
</script>
