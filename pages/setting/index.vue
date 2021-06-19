<template>
  <div class="wrapper">
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
            <v-list-item-title>プロフィールの設定</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <AngleRight to="/setting/profile" />
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>カレンダーの設定</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <AngleRight to="/setting/calendar" />
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>グラフの設定</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <AngleRight to="/setting/chart" />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <h2 class="headline my-5">情報</h2>
    <v-card>
      <v-list outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>プライバシーポリシー</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <AngleRight to="/privacy" />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <h2 class="headline my-5">データ</h2>
    <v-card>
      <v-list outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="error--text">
              すべてのデータを削除
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <TrashCan @clickOK="clickOK" />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RecordsStore, SnackbarModule } from '~/store'
import ToggleDarkMode from '~/components/atom/ToggleDarkMode.vue'
import AngleRight from '~/components/atom/icon/AngleRight.vue'
import TrashCan from '~/components/atom/icon/TrashCan.vue'

export default Vue.extend({
  components: {
    ToggleDarkMode,
    AngleRight,
    TrashCan
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    async clickOK() {
      try {
        await RecordsStore.deleteAll()
        SnackbarModule.info({
          message: 'データの削除に成功しました。'
        })
      } catch (e) {
        this.$sentry.captureException(e)
        SnackbarModule.error({
          message: 'データの削除に失敗しました。'
        })
      }
    }
  },
  head: {
    title: '設定'
  }
})
</script>

<style scoped>
.wrapper {
  max-width: 980px;
  margin: 0 auto;
}
</style>
