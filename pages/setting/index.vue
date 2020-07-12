<template>
  <div>
    <h1 class="h3 py-5">設定</h1>
    <h2 class="headline my-5">基本設定</h2>
    <v-card>
      <v-list two-line outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>ダークモード</v-list-item-title>
            <v-list-item-subtitle
              >ダークモードを適用します。</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <ToggleDarkMode />
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>カレンダーの設定</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon to="/setting/calendar">
              <v-icon>fas fa-angle-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>グラフの設定</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon to="/setting/chart">
              <v-icon>fas fa-angle-right</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
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
