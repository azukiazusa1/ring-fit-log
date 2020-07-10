<template>
  <div>
    <record-date-selector :date="date"></record-date-selector>
    <recrod-form-area
      :props-record="record"
      :is-create-mode="isCreateMode"
      :loading="loading"
      @onSubmit="onSubmit"
      @onDelete="onDelete"
    ></recrod-form-area>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RecordDateSelector from '~/components/molecule/RecordDateSelector.vue'
import RecrodFormArea from '~/components/molecule/RecordFormArea.vue'
import { RecordsStore, SnackbarModule } from '~/store'
import { Record } from '~/types/record'
import isInvalidDate from '~/utils/isInvalidDate'

type AsyncData = {
  date: Date
}

type Data = {
  date: Date
  loading: boolean
}

const initialData: Record = {
  _id: '',
  totalDistanceRun: null,
  totalCaloriesBurned: null,
  totalTimeExercising: null,
  date: '',
  stamps: {
    arms: false,
    stomach: false,
    legs: false,
    yoga: false
  },
  userId: ''
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
      date: new Date(),
      loading: false
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
      this.loading = true
      record.date = this.date
      try {
        if (this.isCreateMode) {
          await RecordsStore.createRecord(record)
          SnackbarModule.info({
            message: '新しい記録を登録しました。'
          })
        } else {
          await RecordsStore.updateRecord(record, this.date)
          SnackbarModule.info({
            message: '記録を更新しました。'
          })
        }
      } catch (e) {
        console.error(e)
        SnackbarModule.error({
          message: '記録の登録に失敗しました。'
        })
      } finally {
        this.loading = false
      }
    },
    async onDelete() {
      console.log('delete record', this.record._id)
      this.loading = true
      const { _id } = this.record
      try {
        if (this.isCreateMode) {
          throw new Error('不正な操作です。')
        }
        await RecordsStore.deleteRecord(_id)
      } catch (e) {
        console.error(e)
        SnackbarModule.error({
          message: '記録の削除に失敗しました。'
        })
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
