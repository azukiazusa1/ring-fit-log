<template>
  <v-card>
    <SettingPageTitle>カレンダーの設定</SettingPageTitle>
    <v-card-text>
      <v-list>
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
            <v-list-item-subtitle
              >カレンダーのカラーを変更します。
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <ChangeColorModal :color.sync="color" />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import SettingPageTitle from '~/components/atom/SettingPageTitle.vue'
import SelectFirstDayOfWeek from '~/components/atom/SelectFirstDayOfWeek.vue'
import ChangeColorModal from '~/components/molecule/ChangeColorModal.vue'
import { SettingStore } from '~/store'
import { Week } from '~/types/setting'

export default Vue.extend({
  components: {
    SettingPageTitle,
    SelectFirstDayOfWeek,
    ChangeColorModal
  },
  computed: {
    day() {
      return SettingStore.getFirstDayOfWeek
    },
    color: {
      get() {
        return SettingStore.getCalandarColor
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
  },
  head() {
    return {
      title: '設定 - カレンダー'
    }
  }
})
</script>
