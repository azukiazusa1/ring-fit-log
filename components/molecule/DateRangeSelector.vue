<template>
  <v-radio-group v-model="_dateRange" row>
    <v-radio label="1週間" value="1-week"></v-radio>
    <v-radio label="1ヶ月" value="1-month"></v-radio>
    <v-radio label="3ヶ月" value="3-month"></v-radio>
    <v-radio label="1年" value="1-year"></v-radio>
  </v-radio-group>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { DateRange } from '~/types/chart'

export default Vue.extend({
  name: 'DateRangeSelector',
  props: {
    dateRange: {
      type: String as PropType<DateRange>,
      required: true
    }
  },
  computed: {
    _dateRange: {
      get(): DateRange {
        return this.dateRange
      },
      set(dateRange: DateRange) {
        this.$emit('update:dateRange', dateRange)
      }
    }
  }
})
</script>
