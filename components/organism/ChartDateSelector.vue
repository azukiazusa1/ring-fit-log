<template>
  <DateSelector
    :date="date"
    :format="format"
    @clickAngleDoubleLeft="beforePrev"
    @clickAngleLeft="prev"
    @clickAngleRight="next"
    @clickAngleDoubleRight="afterNext"
    @changeDate="changeDate"
  >
  </DateSelector>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import DateSelector from '~/components/molecule/DateSelector.vue'
import { DateRange } from '~/types/chart'
import { WEEK1, MONTH1, MONTH3, YEAR1 } from '~/config/constant'

const dateRangeUnit = (dateRange: DateRange) => {
  switch (dateRange) {
    case WEEK1:
      return 'weeks'
    case MONTH1:
      return 'months'
    case MONTH3:
      return 'quarters'
    case YEAR1:
      return 'years'
  }
}

export default Vue.extend({
  name: 'ChartDateSelector',
  components: {
    DateSelector
  },
  props: {
    date: {
      type: Date,
      required: true
    },
    dateRange: {
      type: Number as PropType<DateRange>,
      required: true
    }
  },
  computed: {
    format(): string {
      const d = this.$moment(this.date)
      switch (this.dateRange) {
        case WEEK1:
          return d.format('YYYY/MM/DD（ddd）')
        case MONTH1:
        case MONTH3:
          return d.format('YYYY/MM')
        case YEAR1:
          return d.format('YYYY')
        default:
          return ''
      }
    }
  },
  methods: {
    push(amount: number) {
      this.$router.push({
        name: 'chart',
        query: {
          date: this.$moment(this.date)
            .add(amount, dateRangeUnit(this.dateRange))
            .format('YYYY-MM-DD')
        }
      })
    },
    beforePrev() {
      this.push(-2)
    },
    prev() {
      this.push(-1)
    },
    next() {
      this.push(1)
    },
    afterNext() {
      this.push(2)
    },
    changeDate(date: string) {
      this.$router.push({
        name: 'chart',
        query: {
          date: this.$moment(date).format('YYYY-MM-DD')
        }
      })
    }
  }
})
</script>
