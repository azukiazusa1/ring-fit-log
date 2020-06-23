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
  auth: false,
  layout: 'unauthorized',
  components: {
    BrandIconButton
  },
  methods: {
    loginWithGithub(): void {
      try {
        this.$auth.loginWith('github')
      } catch (e) {
        this.loginError()
      }
    },
    loginWithGoogle(): void {
      try {
        this.$auth.loginWith('google')
      } catch (e) {
        this.loginError()
      }
    },
    loginError(): void {
      SnackbarModule.setSnackbar({
        message: 'ログインに失敗しました。',
        color: 'error'
      })
    }
  }
})
</script>
