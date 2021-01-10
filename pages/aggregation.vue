<template>
  <div>
    <average-data-list
      :user-average-data="userAverageData"
      :average-data="averageData"
    />
    <v-data-table
      :headers="headers"
      :items="desserts"
      :options.sync="options"
      :server-items-length="totalDesserts"
      :loading="loading"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AggregateStore, SnackbarModule } from '~/store'
import AverageDataList from '~/components/molecule/AverageDataList.vue'

export default Vue.extend({
  components: {
    AverageDataList
  },
  async asyncData(): Promise<void> {
    try {
      await AggregateStore.fetch()
    } catch (e) {
      SnackbarModule.error({
        message: 'データの取得に失敗しました。'
      })
    }
  },
  data() {
    return {
      totalDesserts: 0,
      desserts: [],
      loading: false,
      options: {},
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ]
    }
  },
  computed: {
    userAverageData() {
      return AggregateStore.getUserAverageData
    },
    averageData() {
      return AggregateStore.getAverageData
    }
  },
  head() {
    return {
      title: '集計'
    }
  }
})
</script>
