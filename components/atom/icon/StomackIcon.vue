<template>
  <v-btn :color="color" icon @click="click">
    <v-icon>fas fa-grip-vertical </v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'StomachIcon',
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    color(): string {
      return this.value ? 'yellow accent-4' : ''
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
})
</script>
