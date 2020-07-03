<template>
  <div>
    <record-date-selector :date="date"></record-date-selector>
    <recrod-form-area
      :props-record="record"
      :is-create-mode="isCreateMode"
      @onSubmit="onSubmit"
    ></recrod-form-area>
    <span>{{ isCreateMode }}</span>
    <span>{{ record }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RecordDateSelector from '~/components/RecordDateSelector.vue'
import RecrodFormArea from '~/components/RecordFormArea.vue'
import { RecordsStore, SnackbarModule } from '~/store'
import { Record } from '~/types/record'
import isInvalidDate from '~/utils/isInvalidDate'

type AsyncData = {
  date: Date
}

type Data = {
  date: Date
}

const initialData: Record = {
  totalDistanceRun: null,
  totalCaloriesBurned: null,
  totalTimeExercising: '',
  date: '',
  stamps: {
    arms: false,
    stomach: false,
    legs: false,
    yoga: false
  }
}

export default Vue.extend({
  components: {
    RecordDateSelector,
    RecrodFormArea
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
    isCreateMode(): boolean {
      return !RecordsStore.isRecoded(this.date)
    },
    record(): Record {
      return RecordsStore.getRecordByDate(this.date) ?? initialData
    }
  },
  methods: {
    async onSubmit(record: Record) {
      record.date = this.date
      try {
        if (this.isCreateMode) {
          await RecordsStore.createRecord(record)
          SnackbarModule.info({
            message: '新しい記録を登録しました。'
          })
        } else {
          // TODO 更新処理
          return
        }
      } catch (e) {
        SnackbarModule.error({
          message: '記録の登録に失敗しました。'
        })
      }
    }
  }
})
</script>
