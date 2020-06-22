<template>
  <v-card>
    <v-container>
      <v-row align="center">
        <v-col cols="12" class="text-center">
          <brand-icon-button
            brand="google"
            @click="loginWithGoogle"
          ></brand-icon-button>
        </v-col>
        <v-col colse="12" class="text-center">
          <brand-icon-button
            brand="github"
            @click="loginWithGithub"
          ></brand-icon-button>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import BrandIconButton from '~/components/BrandLoginButton.vue'
import { SnackbarModule } from '~/store'

type Data = {
  loggedIn: Boolean
}

type DataType = {
  data: Data
}

export default Vue.extend({
  components: {
    BrandIconButton
  },
  methods: {
    loginWithGithub(): void {
      this.$auth.loginWith('github')
    },
    loginWithGoogle(): void {
      this.$auth.logout()
    },
    setSnackbar() {
      SnackbarModule.setSnackbar({
        message: 'hello',
        color: 'success'
      })
    }
  }
})
</script>
