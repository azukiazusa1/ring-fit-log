<template>
  <v-color-picker v-model="_color" show-swatches hide-mode-switch />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CalendarColorPicker',
  props: {
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    _color: {
      get(): string {
        return this.color
      },
      set(color: string) {
        this.$emit('update:color', color)
      }
    }
  }
})
</script>
