<template>
  <v-app>
    <app-snackbar></app-snackbar>
    <v-app-bar fixed app color="main" dark>
      <toolbar-title>{{ title }}</toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import ToolbarTitle from '~/components/atom/ToolbarTitle.vue'
import AppSnackbar from '~/components/organism/AppSnackbar.vue'

type DataType = {
  title: String
}

export default Vue.extend({
  components: {
    ToolbarTitle,
    AppSnackbar
  },
  data(): DataType {
    return {
      title: 'リングフィットログ'
    }
  }
})
</script>
