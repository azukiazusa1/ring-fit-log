<template>
  <div>
    <record-date-selector :date="date"></record-date-selector>
    <span>{{ isCreateMode }}</span>
    <span>{{ record }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RecordDateSelector from '~/components/RecordDateSelector.vue'
import { RecordsStore } from '~/store'
import { Record } from '~/types/record'
import isInvalidDate from '~/utils/isInvalidDate'

type AsyncData = {
  date: Date
}

type Data = {
  date: Date
}
export default Vue.extend({
  components: {
    RecordDateSelector
  },
  async asyncData({ query, error }): Promise<AsyncData> {
    const queryDate = query.date as string
    const date = isInvalidDate(queryDate) ? new Date() : new Date(queryDate)
    if (RecordsStore.isRecoded(date)) {
      return { date }
    }

    try {
      await RecordsStore.fetchRecord(date)
    } catch (e) {
      console.log(e)
      error({
        statusCode: e.response.status,
        message: e.response.message
      })
    }

    return { date }
  },
  watchQuery: ['date'],
  data(): Data {
    return {
      date: new Date()
    }
  },
  computed: {
    formatedDate(): string {
      return this.$moment(this.date).format('YYYY-MM-DD')
    },
    isCreateMode(): boolean {
      return !RecordsStore.isRecoded(this.date)
    },
    record(): Record | undefined {
      console.log(RecordsStore.getRecords)
      return RecordsStore.getRecordByDate(this.date)
    }
  }
})
</script>
