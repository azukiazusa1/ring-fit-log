<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon>
        <v-icon v-bind="attrs" v-on="on">fas fa-trash</v-icon>
      </v-btn>
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
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'TrashCan',
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    clickCancel() {
      this.dialog = false
      this.$emit('clickCancel')
    },
    clickOK() {
      this.dialog = false
      this.$emit('clickOK')
    }
  }
})
</script>
