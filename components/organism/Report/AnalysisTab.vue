<template>
  <div>
    <report-header>よく運動する時間</report-header>
    <p class="pa-4 text-body-1">
      あなたはよく0時頃に運動しているようです。
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ReportHeader from '@/components/atom/Report/Header.vue'

export default Vue.extend({
  components: {
    ReportHeader
  }
})
</script>
