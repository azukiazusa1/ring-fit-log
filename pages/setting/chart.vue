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
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>い</v-list-item-title>
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
import ChangeColorModal from '~/components/molecule/ChangeColorModal.vue'
import { SettingStore } from '~/store'

export default Vue.extend({
  components: {
    SettingPageTitle,
    ChangeColorModal
  },
  computed: {
    smoothing: {
      get() {
        return SettingStore.isSmoothed
      },
      set(smoothing: boolean) {
        SettingStore.toggleSmoothing(smoothing)
      }
    }
  }
})
</script>
