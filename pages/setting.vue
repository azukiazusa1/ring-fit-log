<template>
  <div>
    <h1 class="headline">設定</h1>
    <ToggleDarkMode></ToggleDarkMode>
    <v-select :items="items" :value="day" @change="change"></v-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ToggleDarkMode from '~/components/atom/ToggleDarkMode.vue'
import { SettingStore } from '~/store'
import { Week } from '~/types/setting'
import { JAPANESE_DAYS } from '~/config/constant'

type Items = {
  value: number
  text: string
}

export default Vue.extend({
  components: {
    ToggleDarkMode
  },
  computed: {
    day() {
      return SettingStore.getFirstDayOfWeek
    },
    items(): Items[] {
      const items: Items[] = []
      JAPANESE_DAYS.forEach((text, value) => {
        items.push({ text, value })
      })
      return items
    }
  },
  methods: {
    change(v: Week) {
      SettingStore.changeFirstDayOfWeek(v)
    }
  }
})
</script>
