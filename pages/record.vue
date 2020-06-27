<template>
  <div>
    <span>{{ formatedDate }}</span>
    <span>{{ isCreateMode }}</span>
    <span>{{ record }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RecordsStore } from '~/store'
import { Record } from '~/types/record'

type AsyncData = {
  date: Date
}

type Data = {
  date: Date
}
export default Vue.extend({
  async asyncData({ query, error }): Promise<AsyncData> {
    let date = new Date(query.date as string)
    if (date.toString() === 'Invalid Date') {
      date = new Date()
    }
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
