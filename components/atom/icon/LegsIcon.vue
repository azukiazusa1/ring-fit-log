<template>
  <v-btn :color="color" icon @click="click">
    <v-icon>{{ mdiSeatLegroomReduced }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiSeatLegroomReduced } from '@mdi/js'

export default Vue.extend({
  name: 'LegsIcon',
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      mdiSeatLegroomReduced
    }
  },
  computed: {
    color(): string {
      return this.value ? 'indigo accent-4' : ''
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
})
</script>
