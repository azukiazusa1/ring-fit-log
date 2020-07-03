<template>
  <v-btn
    :color="brand"
    dark
    tile
    min-width="300"
    class="text-capitalize"
    @click="onClick"
  >
    <v-icon left>fab fa-{{ brand }}</v-icon
    >{{ brand }}でログイン
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    brand: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
})
</script>
