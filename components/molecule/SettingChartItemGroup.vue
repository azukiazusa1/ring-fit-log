<template>
  <v-list-group no-action>
    <template #activator>
      <v-list-item-content>
        <v-list-item-title>{{ item }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ item }}のスタイルを変更します。
        </v-list-item-subtitle>
      </v-list-item-content>
    </template>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>非表示</v-list-item-title>
        <v-list-item-subtitle>
          {{ item }}のデータが表示されなくなれます。
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-switch v-model="_hidden"></v-switch>
      </v-list-item-action>
    </v-list-item>
  </v-list-group>
</template>

<script lang="ts">
import Vue from 'vue'
import ChangeColorModal from '~/components/molecule/ChangeColorModal.vue'

export default Vue.extend({
  name: 'SettingChartItemGroup',
  props: {
    item: {
      type: String,
      required: true
    },
    hidden: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    _hidden: {
      get(): boolean {
        return this.hidden
      },
      set(hidden: boolean) {
        this.$emit('update:hidden', hidden)
      }
    }
  }
})
</script>
