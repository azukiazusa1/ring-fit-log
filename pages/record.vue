<template>
  <div class="wrapper">
    <record-date-selector :date="date"></record-date-selector>
    <recrod-form-area
      :props-record="record"
      :is-create-mode="isCreateMode"
      :loading="loading"
      @onCreate="onCreate"
      @onUpdate="onUpdate"
      @onDelete="onDelete"
    ></recrod-form-area>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RecordDateSelector from '~/components/organism/RecordDateSelector.vue'
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
  comment: '',
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
  async asyncData({ query, $sentry }): Promise<AsyncData> {
    const queryDate = query.date as string
    const date = isInvalidDate(queryDate) ? new Date() : new Date(queryDate)
    if (RecordsStore.isRecoded(date)) {
      return { date }
    }

    try {
      await RecordsStore.fetchRecord(date)
    } catch (e) {
      $sentry.captureException(e)
      SnackbarModule.error({
        message: 'データの取得時にエラーが発生しました。'
      })
    }

    return { date }
  },
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
    async onCreate(record: Record) {
      this.loading = true
      record.date = this.date
      try {
        await RecordsStore.createRecord(record)
        SnackbarModule.info({
          message: '新しい記録を登録しました。'
        })
      } catch (e) {
        this.$sentry.captureException(e)
        SnackbarModule.error({
          message: '記録の登録に失敗しました。'
        })
      } finally {
        this.loading = false
      }
    },
    async onUpdate(record: Record) {
      this.loading = true
      const { _id } = record
      try {
        await RecordsStore.updateRecord({ record, _id })
        SnackbarModule.info({
          message: '記録を更新しました。'
        })
      } catch (e) {
        this.$sentry.captureException(e)
        SnackbarModule.error({
          message: '記録の更新に失敗しました。'
        })
      } finally {
        this.loading = false
      }
    },
    async onDelete() {
      this.loading = true
      const { _id } = this.record
      try {
        if (this.isCreateMode) {
          throw new Error('不正な操作です。')
        }
        await RecordsStore.deleteRecord(_id)
        SnackbarModule.info({
          message: '記録を削除しました。'
        })
      } catch (e) {
        this.$sentry.captureException(e)
        SnackbarModule.error({
          message: '記録の削除に失敗しました。'
        })
      } finally {
        this.loading = false
      }
    }
  },
  head(): {
    title: string
  } {
    return {
      title: `${this.$moment(this.date).format('YYYY-MM-DD')}の記録`
    }
  },
  watchQuery: ['date']
})
</script>

<style scoped>
.wrapper {
  max-width: 980px;
  margin: 0 auto;
}
</style>
