<template>
  <v-toolbar-title>
    <nuxt-link to="/" class="toolbar-title font-weight-bold">
      <slot />
    </nuxt-link>
  </v-toolbar-title>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>
