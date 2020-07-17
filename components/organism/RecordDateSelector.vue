<template>
  <dateSelector
    :date="date"
    @clickAngleDoubleLeft="prevWeek"
    @clickAngleLeft="prevDay"
    @clickAngleRight="nextDay"
    @clickAngleDoubleRight="nextWeek"
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
    nextDay(): void {
      this.$router.push({
        name: 'record',
        query: {
          date: this.$moment(this.date)
            .add(1, 'days')
            .format('YYYY-MM-DD')
        }
      })
    },
    prevDay(): void {
      this.$router.push({
        name: 'record',
        query: {
          date: this.$moment(this.date)
            .add(-1, 'days')
            .format('YYYY-MM-DD')
        }
      })
    },
    nextWeek(): void {
      this.$router.push({
        name: 'record',
        query: {
          date: this.$moment(this.date)
            .add(1, 'weeks')
            .format('YYYY-MM-DD')
        }
      })
    },
    prevWeek(): void {
      this.$router.push({
        name: 'record',
        query: {
          date: this.$moment(this.date)
            .add(-1, 'weeks')
            .format('YYYY-MM-DD')
        }
      })
    }
  }
})
</script>
