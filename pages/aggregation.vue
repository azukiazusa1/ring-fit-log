<template>
  <div>
    <average-data-list
      :user-average-data="userAverageData"
      :average-data="averageData"
    />
    <v-data-table
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      :footer-props="footerProps"
      locale="ja"
      class="elevation-1"
      @click:row="clickTableTow"
    >
      <template v-slot:item.date="{ item }">
        <app-time :date="item.date" format="YYYY/MM/DD（ddd）" />
      </template>
      <template v-slot:item.totalTimeExercising="{ item }">
        {{ ms2stringTime(item.totalTimeExercising) }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { AggregateStore, RecordsStore, SnackbarModule } from '~/store'
import AverageDataList from '~/components/molecule/AverageDataList.vue'
import AppTime from '~/components/atom/AppTime.vue'
import { ms2stringTime } from '~/utils/msConversion'

export default Vue.extend({
  components: {
    AverageDataList,
    AppTime
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
      loading: true,
      options: {},
      headers: [
        {
          text: '日付',
          align: 'start',
          sortable: false,
          value: 'date'
        },
        { text: '活動時間', value: 'totalTimeExercising' },
        { text: '消費カロリー(kcal)', value: 'totalCaloriesBurned' },
        { text: '走行距離(km)', value: 'totalDistanceRun' }
      ],
      footerProps: {
        itemsPerPageOptions: [5, 10, 15]
      }
    }
  },
  computed: {
    userAverageData() {
      return AggregateStore.getUserAverageData
    },
    averageData() {
      return AggregateStore.getAverageData
    },
    items() {
      return RecordsStore.getRecordList?.docs
    },
    total() {
      return RecordsStore.getRecordList?.totalDocs
    }
  },
  watch: {
    options: {
      handler() {
        this.loading = true
        try {
          RecordsStore.fetchRecordList(this.options)
        } catch (e) {
          SnackbarModule.error({
            message: 'データの取得に失敗しました。'
          })
        } finally {
          this.loading = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ms2stringTime,
    clickTableTow(item: Record) {
      this.$router.push({
        name: 'record',
        query: {
          date: this.$moment(item.date).format('YYYY-MM-DD')
        }
      })
    }
  },
  head() {
    return {
      title: '集計'
    }
  }
})
</script>
