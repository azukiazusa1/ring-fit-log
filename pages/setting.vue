<template>
  <div>
    <h1 class="h3 py-5">設定</h1>
    <h2 class="headline my-5">基本設定</h2>
    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <ToggleDarkMode />
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col>
            <SelectFirstDayOfWeek :day="day" @change="changeFirstDayOfWeek" />
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col>
            <ChangeCalandarColor :color.sync="color" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ToggleDarkMode from '~/components/atom/ToggleDarkMode.vue'
import SelectFirstDayOfWeek from '~/components/atom/SelectFirstDayOfWeek.vue'
import ChangeCalandarColor from '~/components/molecule/ChangeCalendarColor.vue'
import { SettingStore } from '~/store'
import { Week } from '~/types/setting'

export default Vue.extend({
  components: {
    ToggleDarkMode,
    SelectFirstDayOfWeek,
    ChangeCalandarColor
  },
  computed: {
    day() {
      return SettingStore.getFirstDayOfWeek
    },
    color: {
      get() {
        return SettingStore.getcalendarColor
      },
      set(color: string) {
        SettingStore.changeCalandarColor(color)
      }
    }
  },
  methods: {
    changeFirstDayOfWeek(v: Week) {
      SettingStore.changeFirstDayOfWeek(v)
    }
  }
})
</script>
