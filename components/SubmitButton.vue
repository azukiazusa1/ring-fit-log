<template>
  <v-btn rounded color="primary" min-width="300" @click="click">
    <slot />
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SubmitButton',

  methods: {
    click() {
      this.$emit('click')
    }
  }
})
</script>
fa
