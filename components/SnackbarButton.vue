<template>
  <div>
    <v-btn @click="info">Info</v-btn>
    <v-btn @click="error">Error</v-btn>
    <v-btn @click="warning">Warning</v-btn>
    <v-btn @click="success">Success</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SnackbarModule } from '~/store'

export default Vue.extend({
  methods: {
    info() {
      SnackbarModule.info({
        message: 'info'
      })
    },
    error() {
      SnackbarModule.error({
        message: 'error'
      })
    },
    warning() {
      SnackbarModule.warning({
        message: 'warning',
        top: true,
        timeout: 1000
      })
    },
    success() {
      SnackbarModule.success({
        message: 'success',
        bottom: true
      })
    }
  }
})
</script>
