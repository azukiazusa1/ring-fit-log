<template functional>
  <time :datetime="$options.methods.datetime(props.date)">
    {{ $options.methods.formatedDate(props.date, props.format) }}
  </time>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'

export default Vue.extend({
  name: 'AppTime',
  props: {
    date: {
      type: Date,
      required: true
    },
    format: {
      type: String,
      required: false,
      default: 'YYYY-MM-DDTHH:mm'
    }
  },
  methods: {
    formatedDate(date: Date, format: string): string {
      return moment(date).format(format)
    },
    datetime(date: Date) {
      return moment(date).format()
    }
  }
})
</script>
