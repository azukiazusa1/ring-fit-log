<template>
  <time :datetime="datetime">{{ formatedDate }}</time>
</template>

<script lang="ts">
import Vue from 'vue'
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
  computed: {
    formatedDate(): string {
      return this.$moment(this.date).format(this.format)
    },
    datetime(): string {
      return this.$moment(this.date).format()
    }
  }
})
</script>
