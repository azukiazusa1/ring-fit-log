<template>
  <div>
    <h1 class="h3 py-5">設定</h1>
    <h2 class="headline my-5">基本設定</h2>
    <v-card>
      <v-list two-line outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>ダークモード</v-list-item-title>
            <v-list-item-subtitle>
              ダークモードを適用します。
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <ToggleDarkMode />
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <SelectFirstDayOfWeek :day="day" @change="changeFirstDayOfWeek" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>カレンダーテーマ</v-list-item-title>
            <v-list-item-subtitle>
              カレンダーのカラーを変更します。
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <ChangeCalandarColor :color.sync="color" />
          </v-list-item-action>
        </v-list-item>
      </v-list>
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
