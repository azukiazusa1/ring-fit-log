<template>
  <v-btn icon @click="$emit('click')" :to="to">
    <v-icon>fas fa-angle-left</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AngleLeft',
  props: {
    to: {
      type: String,
      required: false,
      default: undefined
    }
  }
})
</script>
