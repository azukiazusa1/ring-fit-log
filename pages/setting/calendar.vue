<template>
  <v-card>
    <v-card-title>
      <v-btn icon exact to="/setting" class="mr-5">
        <v-icon small>fas fa-angle-left</v-icon>
      </v-btn>
      <h1 class="subtitle-1">
        カレンダーの設定
      </h1>
    </v-card-title>
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
import SelectFirstDayOfWeek from '~/components/atom/SelectFirstDayOfWeek.vue'
import ChangeColorModal from '~/components/molecule/ChangeColorModal.vue'
import { SettingStore } from '~/store'
import { Week } from '~/types/setting'

export default Vue.extend({
  components: {
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
  }
})
</script>
