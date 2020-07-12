<template>
  <v-card>
    <SettingPageTitle>グラフの設定</SettingPageTitle>
    <v-card-text>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              スムージング
            </v-list-item-title>
            <v-list-item-subtitle>
              折れ線グラフの表示をなめらかにします。
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch v-model="smoothing"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <SettingChartItemGroup
          item="消費カロリー"
          :hidden.sync="hiddenTotalCaloriesBurned"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import SettingPageTitle from '~/components/atom/SettingPageTitle.vue'
import SettingChartItemGroup from '~/components/molecule/SettingChartItemGroup.vue'
import { SettingStore } from '~/store'

export default Vue.extend({
  components: {
    SettingPageTitle,
    SettingChartItemGroup
  },
  computed: {
    smoothing: {
      get() {
        return SettingStore.isSmoothed
      },
      set(smoothing: boolean) {
        SettingStore.toggleSmoothing(smoothing)
      }
    },
    hiddenTotalCaloriesBurned: {
      get() {
        return SettingStore.isHiddenTotalCaloriesBurned
      },
      set() {
        SettingStore.toggleHiddenTotalCaloriesBurned()
      }
    }
  }
})
</script>
