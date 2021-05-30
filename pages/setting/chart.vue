<template>
  <v-card class="wrapper">
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
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              グリッドライン（縦）
            </v-list-item-title>
            <v-list-item-subtitle>
              グラフの縦線を表示します。
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch v-model="gridLineX"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              グリッドライン（横）
            </v-list-item-title>
            <v-list-item-subtitle>
              グラフの横線を表示します。
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch v-model="gridLineY"></v-switch>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <SettingChartItemGroup
          item="消費カロリー"
          :hidden.sync="hiddenTotalCaloriesBurned"
          :color.sync="totalCaloriesBurnedColor"
        />
        <v-divider />
        <SettingChartItemGroup
          item="走行距離"
          :hidden.sync="hiddenTotalDistanceRun"
          :color.sync="totalDistanceRunColor"
        />
        <v-divider />
        <SettingChartItemGroup
          item="活動時間"
          :hidden.sync="hiddenTotalTimeExercising"
          :color.sync="totalTimeExercisingColor"
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
    gridLineX: {
      get() {
        return SettingStore.getGridLineX
      },
      set(gridLineX: boolean) {
        SettingStore.toggleGridLineX(gridLineX)
      }
    },
    gridLineY: {
      get() {
        return SettingStore.getGridLineY
      },
      set(gridLineY: boolean) {
        SettingStore.toggleGridLineY(gridLineY)
      }
    },
    hiddenTotalCaloriesBurned: {
      get() {
        return SettingStore.isHiddenTotalCaloriesBurned
      },
      set() {
        SettingStore.toggleHiddenTotalCaloriesBurned()
      }
    },
    totalCaloriesBurnedColor: {
      get() {
        return SettingStore.getTotalCaloriesBurnedColor
      },
      set(color: string) {
        SettingStore.changeTotalCaloriesBurnedColor(color)
      }
    },
    hiddenTotalDistanceRun: {
      get() {
        return SettingStore.isHiddenTotalDistanceRun
      },
      set() {
        SettingStore.toggleHiddenTotalDistanceRun()
      }
    },
    totalDistanceRunColor: {
      get() {
        return SettingStore.getTotalDistanceRunColor
      },
      set(color: string) {
        SettingStore.changeTotalDistanceRunColor(color)
      }
    },
    hiddenTotalTimeExercising: {
      get() {
        return SettingStore.isHiddenTotalTimeExercising
      },
      set() {
        SettingStore.toggleHiddenTotalTimeExercising()
      }
    },
    totalTimeExercisingColor: {
      get() {
        return SettingStore.getTotalTimeExercisingColor
      },
      set(color: string) {
        SettingStore.changeTotalTimeExercisingColor(color)
      }
    }
  },
  head() {
    return {
      title: '設定 - グラフ'
    }
  }
})
</script>

<style scoped>
.wrapper {
  max-width: 980px;
  margin: 0 auto;
}
</style>
