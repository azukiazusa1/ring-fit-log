<template>
  <v-btn
    rounded
    color="primary"
    min-width="300"
    :disabled="disabled"
    @click="click"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SubmitButton',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
})
</script>
