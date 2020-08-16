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
          データが表示されなくなれます。
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-switch v-model="_hidden"></v-switch>
      </v-list-item-action>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>カラー</v-list-item-title>
        <v-list-item-subtitle>
          カラーを変更します。
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <ChangeColorModal :color.sync="_color" />
      </v-list-item-action>
    </v-list-item>
  </v-list-group>
</template>

<script lang="ts">
import Vue from 'vue'
import ChangeColorModal from '~/components/molecule/ChangeColorModal.vue'

export default Vue.extend({
  name: 'SettingChartItemGroup',
  components: {
    ChangeColorModal
  },
  props: {
    item: {
      type: String,
      required: true
    },
    hidden: {
      type: Boolean,
      required: true
    },
    color: {
      type: String,
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
    },
    _color: {
      get(): string {
        return this.color
      },
      set(color: string) {
        this.$emit('update:color', color)
      }
    }
  }
})
</script>
