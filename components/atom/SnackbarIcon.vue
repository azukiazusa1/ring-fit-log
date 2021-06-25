<template>
  <v-icon class="app-icon" small>{{ iconName }}</v-icon>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Types } from '~/types/index'

export default Vue.extend({
  name: 'SnackbarIcon',
  props: {
    type: {
      type: String as PropType<Types>,
      required: true
    }
  },
  computed: {
    iconName() {
      switch (this.type) {
        case 'info':
          return 'fas fa-circle-info'
        case 'error':
          return 'fas fa-exclamation-triangle'
        case 'warning':
          return 'fas fa-exclamation-circle'
        case 'success':
          return 'fas fa-check-circle'
        default:
          return ''
      }
    }
  }
})
</script>

<style scoped>
.app-icon {
  margin-right: 10px;
}
</style>
