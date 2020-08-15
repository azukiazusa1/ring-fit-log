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
            <AngleRight @click="router.push('/setting/calendar')" />
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>グラフの設定</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <AngleRight @click="$router.push('/setting/chart')" />
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
            <AngleRight @click="$router.push('/privacy')" />
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <h2 class="headline my-5">データ</h2>
    <v-card>
      <v-list outlined>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="error--text"
              >すべてのデータを削除</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-dialog v-model="dialog" max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <TrashCan v-on="on" v-bind="attrs" />
              </template>
              <slot name="dialog">
                <v-card>
                  <v-card-title class="subtitle-1">
                    すべてのデータを削除します。本当によろしいですか？
                  </v-card-title>
                  <v-card-text>
                    この操作は取り消せません。
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="clickCancel">
                      キャンセル
                    </v-btn>
                    <v-btn color="error" text @click="clickOK">
                      削除する
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </slot>
            </v-dialog>
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
  head: {
    title: '設定'
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    clickCancel() {
      this.dialog = false
    },
    async clickOK() {
      this.dialog = false
      try {
        await RecordsStore.deleteAll()
        SnackbarModule.info({
          message: 'データの削除に成功しました。'
        })
      } catch (e) {
        console.error(e)
        SnackbarModule.error({
          message: 'データの削除に失敗しました。'
        })
      }
    }
  }
})
</script>
