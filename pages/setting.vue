<template>
  <div>
    <h1 class="headline">設定</h1>
    <ToggleDarkMode></ToggleDarkMode>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ToggleDarkMode from '~/components/atom/ToggleDarkMode.vue'

export default Vue.extend({
  components: {
    ToggleDarkMode
  }
})
</script>
