<template>
  <div class="wrapper">
    <aggregate-data-list
      class="mb-2"
      header="1日の平均"
      :user-time-exercising="userAverageData.avgTimeExercising"
      :user-distance-run="userAverageData.avgDistanceRun"
      :user-calories-burned="userAverageData.avgCaloriesBurned"
      :time-exercising="averageData.avgTimeExercising"
      :distance-run="averageData.avgDistanceRun"
      :calories-burned="averageData.avgCaloriesBurned"
    />
    <aggregate-data-list
      class="mb-2"
      header="最大記録"
      :user-time-exercising="userAverageData.maxTimeExercising"
      :user-distance-run="userAverageData.maxDistanceRun"
      :user-calories-burned="userAverageData.maxCaloriesBurned"
      :time-exercising="averageData.maxTimeExercising"
      :distance-run="averageData.maxDistanceRun"
      :calories-burned="averageData.maxCaloriesBurned"
    />
    <aggregate-data-list
      class="mb-2"
      header="合計記録"
      :user-time-exercising="userAverageData.sumTimeExercising"
      :user-distance-run="userAverageData.sumDistanceRun"
      :user-calories-burned="userAverageData.sumCaloriesBurned"
      :time-exercising="averageData.sumTimeExercising"
      :distance-run="averageData.sumDistanceRun"
      :calories-burned="averageData.sumCaloriesBurned"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AggregateDataList from '~/components/molecule/Report/AggregateDateList.vue'
import { AggregateStore } from '~/store'

export default Vue.extend({
  components: {
    AggregateDataList
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

<style scoped>
.wrapper {
  max-width: 980px;
  margin: 0 auto;
}
</style>
