<template>
  <v-snackbar
    v-model="appear"
    :color="type || color"
    centered
    :top="top"
    :right="right"
    :left="left"
    :bottom="bottom"
    elevation="4"
    :shaped="shaped"
    :timeout="timeout"
    transition="scale-transition"
  >
    <template v-slot:action="{ attrs }">
      <v-btn dark icon v-bind="attrs" @click="close">
        <v-icon size="18">fas fa-times-circle</v-icon>
      </v-btn>
    </template>
    <snackbar-icon :type="type"></snackbar-icon>
    <span v-if="escape" v-html="message"></span>
    <span v-else class="font-weight-bold">{{ message }}</span>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import SnackbarIcon from '~/components/atom/SnackbarIcon.vue'
import { SnackbarModule } from '~/store'

export default Vue.extend({
  name: 'AppSnackbar',
  components: {
    SnackbarIcon
  },
  computed: {
    message() {
      return SnackbarModule.getMessage
    },
    appear: {
      get() {
        return SnackbarModule.isAppear
      },
      set() {
        this.close()
      }
    },
    type() {
      return SnackbarModule.getType
    },
    top() {
      return SnackbarModule.isTop
    },
    right() {
      return SnackbarModule.isRight
    },
    left() {
      return SnackbarModule.isLeft
    },
    bottom() {
      return SnackbarModule.isBottom
    },
    timeout() {
      return SnackbarModule.getTimeout
    },
    shaped() {
      return SnackbarModule.getShaped
    },
    color() {
      return SnackbarModule.getColor
    },
    escape() {
      return SnackbarModule.isEscape
    }
  },
  methods: {
    close() {
      SnackbarModule.close()
    }
  }
})
</script>
