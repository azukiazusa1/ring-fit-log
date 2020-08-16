<template>
  <v-btn icon @click="$emit('click')" :to="to">
    <v-icon>fas fa-angle-right</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AngleRight',
  props: {
    to: {
      type: String,
      required: false,
      default: undefined
    }
  }
})
</script>
