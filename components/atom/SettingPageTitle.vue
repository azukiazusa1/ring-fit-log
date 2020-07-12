<template>
  <v-card-title>
    <v-btn icon exact to="/setting" class="mr-5">
      <v-icon small>fas fa-angle-left</v-icon>
    </v-btn>
    <h1 class="subtitle-1">
      <slot />
    </h1>
  </v-card-title>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SettingPageTitle'
})
</script>
