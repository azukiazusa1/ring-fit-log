<template>
  <dateSelector
    :date="date"
    @clickAngleDoubleLeft="prevWeek"
    @clickAngleLeft="prevDay"
    @clickAngleRight="nextDay"
    @clickAngleDoubleRight="nextWeek"
    @changeDate="changeDate"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import DateSelector from '~/components/molecule/DateSelector.vue'

export default Vue.extend({
  name: 'RecordDateSelector',
  components: {
    DateSelector
  },
  props: {
    date: {
      type: Date,
      required: true
    }
  },
  methods: {
    push(amount: number): void {
      this.$router.push({
        name: 'record',
        query: {
          date: this.$moment(this.date)
            .add(amount, 'days')
            .format('YYYY-MM-DD')
        }
      })
    },
    nextDay(): void {
      this.push(1)
    },
    prevDay(): void {
      this.push(-1)
    },
    nextWeek(): void {
      this.push(7)
    },
    prevWeek(): void {
      this.push(-7)
    },
    changeDate(date: string): void {
      this.$router.push({
        name: 'record',
        query: {
          date: this.$moment(date).format('YYYY-MM-DD')
        }
      })
    }
  }
})
</script>
