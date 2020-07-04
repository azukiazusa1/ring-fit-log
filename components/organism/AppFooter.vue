<template>
  <v-bottom-navigation class="d-md-none" color="main">
    <template v-for="(item, key) in items">
      <NavItem :key="key" :title="item.title" :icon="item.icon" :to="item.to" />
    </template>
  </v-bottom-navigation>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import NavItem from '~/components/atom/NavItem.vue'
import { Item } from '~/types/index'

export default Vue.extend({
  name: 'AppFooter',
  components: {
    NavItem
  },
  props: {
    items: {
      type: Array as PropType<Item[]>,
      required: true
    }
  }
})
</script>
