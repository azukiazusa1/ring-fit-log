<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <brand-icon-button
            brand="twitter"
            @click="loginWithTwitter"
          ></brand-icon-button>
        </v-col>
        <v-col cols="12" class="text-center">
          <brand-icon-button
            brand="google"
            @click="loginWithGoogle"
          ></brand-icon-button>
        </v-col>
        <v-col cols="12" class="text-center">
          <brand-icon-button
            brand="github"
            @click="loginWithGithub"
          ></brand-icon-button>
        </v-col>
        <v-col cols="12" class="text-center">
          <brand-icon-button
            brand="facebook"
            @click="loginWithFacebook"
          ></brand-icon-button>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import BrandIconButton from '~/components/atom/BrandLoginButton.vue'
import { SnackbarModule } from '~/store'

export default Vue.extend({
  name: 'LoginButtons',
  components: {
    BrandIconButton
  },
  methods: {
    loginWithTwitter(): void {
      try {
        this.$auth.loginWith('twitter')
      } catch (e) {
        this.loginError(e)
      }
    },
    loginWithGithub(): void {
      try {
        this.$auth.loginWith('github')
      } catch (e) {
        this.loginError(e)
      }
    },
    loginWithGoogle(): void {
      try {
        this.$auth.loginWith('google')
      } catch (e) {
        this.loginError(e)
      }
    },
    loginWithFacebook(): void {
      try {
        this.$auth.loginWith('facebook')
      } catch (e) {
        this.loginError(e)
      }
    },
    loginError(e: Error): void {
      this.$sentry.captureException(e)
      SnackbarModule.error({
        message: 'ログインに失敗しました。'
      })
    }
  }
})
</script>
