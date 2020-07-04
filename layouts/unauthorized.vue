<template>
  <v-app>
    <app-snackbar></app-snackbar>
    <v-app-bar fixed app color="main" dark>
      <v-toolbar-title v-text="title" />
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
import AppSnackbar from '~/components/organism/AppSnackbar.vue'

type DataType = {
  title: String
}

export default Vue.extend({
  components: {
    AppSnackbar
  },
  data(): DataType {
    return {
      title: 'Vuetify.js'
    }
  }
})
</script>
