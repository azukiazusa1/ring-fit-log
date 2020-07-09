<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="error"
        dark
        v-bind="attrs"
        min-width="300"
        rounded
        :disabled="disabled"
        :loading="loading"
        v-on="on"
      >
        <slot name="buttonText">削除する</slot>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="subtitle-1">
        <slot name="dialogTitle">削除します。よろしいですか？</slot>
      </v-card-title>
      <v-card-text>
        <slot name="diaologText">この操作は取り消せません。</slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="clickCancel">
          <slot name="dialogCancel">キャンセル</slot>
        </v-btn>
        <v-btn color="error" text @click="clickOK">
          <slot name="dialogOK">削除する</slot>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DeleteButton',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
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
    clickOK() {
      this.dialog = false
      this.$emit('clickOK')
    }
  }
})
</script>
