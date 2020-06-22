<template>
  <v-snackbar
    v-model="appear"
    :color="color"
    centered
    :top="top"
    :right="right"
    :left="left"
    :bottom="bottom"
    :timeout="timeout"
    transition="scale-transition"
  >
    <template v-slot:action="{ attrs }">
      <v-btn dark icon v-bind="attrs" @click="close">
        <v-icon>fas fa-times-circle</v-icon>
      </v-btn>
    </template>
    <span v-if="!escape" v-html="message"></span>
    <span v-else>{{ message }}</span>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import { SnackbarModule } from '~/store'

export default Vue.extend({
  name: 'AppSnackbar',
  computed: {
    message() {
      return SnackbarModule.message
    },
    appear: {
      get() {
        return SnackbarModule.appear
      },
      set() {
        SnackbarModule.close()
      }
    },
    color() {
      return SnackbarModule.color
    },
    top() {
      return SnackbarModule.top
    },
    right() {
      return SnackbarModule.right
    },
    left() {
      return SnackbarModule.left
    },
    bottom() {
      return SnackbarModule.bottom
    },
    timeout() {
      return SnackbarModule.timeout
    },
    escape() {
      return SnackbarModule.escape
    }
  },
  methods: {
    close() {
      SnackbarModule.close()
    }
  }
})
</script>
