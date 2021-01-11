<template>
  <v-btn icon :to="to" @click="$emit('click')">
    <v-icon>fas fa-angle-double-right</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AngleDoubleRight',
  props: {
    to: {
      type: String,
      required: false,
      default: undefined
    }
  }
})
</script>
