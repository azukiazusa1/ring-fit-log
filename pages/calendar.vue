<template>
  <v-row class="wrapper">
    <client-only>
      <v-date-picker
        v-model="date"
        full-width
        :events="functionEvents"
        locale="ja"
        :first-day-of-week="firstDayOfWeek"
        :color="color"
        :day-format="(date) => new Date(date).getDate()"
        :picker-date.sync="pickerDate"
      ></v-date-picker>
      <v-skeleton-loader slot="placeholder" type="date-picker-days" />
    </client-only>
    <ShowRecord :record="record" @buttonClick="buttonClick"></ShowRecord>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import ShowRecord from '~/components/molecule/ShowRecord.vue'
import { RecordsStore, SnackbarModule, SettingStore } from '~/store'
import { Record } from '~/types/record'

export default Vue.extend({
  components: {
    ShowRecord
  },
  async asyncData({ $moment, $sentry }) {
    const now = new Date()
    const date = $moment(now).format('YYYY-MM-DD')
    const month = $moment(now).format('YYYY-MM')
    if (RecordsStore.isChached(month)) return { date }

    try {
      await RecordsStore.fetchRecordByMonth(month)
      return { date }
    } catch (e) {
      $sentry.captureException(e)
      SnackbarModule.error({
        message: 'データの取得時にエラーが発生しました。'
      })
    }
  },
  data() {
    return {
      date: '',
      pickerDate: null
    }
  },
  computed: {
    record(): Record | undefined {
      return RecordsStore.getRecordByDate(new Date(this.date))
    },
    firstDayOfWeek() {
      return SettingStore.getFirstDayOfWeek
    },
    color() {
      return SettingStore.getCalandarColor
    }
  },
  watch: {
    async pickerDate(val) {
      if (RecordsStore.isChached(val)) return
      try {
        await RecordsStore.fetchRecordByMonth(val)
      } catch (e) {
        this.$sentry.captureException(e)
        SnackbarModule.error({
          message: 'データの取得時にエラーが発生しました。'
        })
      }
    }
  },
  methods: {
    functionEvents(date: string) {
      return RecordsStore.isRecoded(new Date(date)) ? this.color : false
    },
    buttonClick() {
      this.$router.push(`/record?date=${this.date}`)
    }
  },
  head() {
    return {
      title: 'カレンダー'
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
