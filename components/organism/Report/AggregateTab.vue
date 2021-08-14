<template>
  <average-data-list
    :user-average-data="userAverageData"
    :average-data="averageData"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import AverageDataList from '@/components/molecule/Report/AverageDataList.vue'
import { AggregateStore } from '~/store'

export default Vue.extend({
  components: {
    AverageDataList
  },
  computed: {
    userAverageData() {
      return AggregateStore.getUserAverageData
    },
    averageData() {
      return AggregateStore.getAverageData
    }
  }
})
</script>
