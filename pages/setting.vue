<template>
  <div>
    <h1 class="headline">設定</h1>
    <ToggleDarkMode></ToggleDarkMode>
    <v-select :items="items" @change="change"></v-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ToggleDarkMode from '~/components/atom/ToggleDarkMode.vue'
import { SettingStore } from '~/store'
import { Week } from '~/types/setting'

export default Vue.extend({
  components: {
    ToggleDarkMode
  },
  computed: {
    items(): Week[] {
      return [0, 1, 3, 4, 5, 6, 7]
    }
  },
  methods: {
    change(v: Week) {
      SettingStore.changeFirstDayOfWeek(v)
    }
  }
})
</script>
