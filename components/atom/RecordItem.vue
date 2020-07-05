<template>
  <div>
    <div class="subtitle-2 ma-2 text-center bold">
      <v-sheet class="py-3">
        <slot name="title" />
      </v-sheet>
      <v-divider></v-divider>
    </div>
    <span class="float-right">
      <span>{{ value }}</span>
      <span><slot name="unit"/></span>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'RecordItem',
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: null
    }
  }
})
</script>
