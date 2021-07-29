<template>
  <div>
    <report-header>よく運動する時間</report-header>
    <p class="pa-4 text-body-1">
      あなたはよく{{ hour }}時頃に運動しているようです。
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ReportHeader from '@/components/atom/Report/Header.vue'
import { AggregateStore } from '~/store'

export default Vue.extend({
  components: {
    ReportHeader
  },
  computed: {
    hour(): number | undefined {
      return AggregateStore.getUserMostFrequentTime?.hour
    }
  }
})
</script>
