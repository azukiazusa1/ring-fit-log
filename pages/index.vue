<template>
  <v-card>
    <v-container>
      <v-row>
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
import SnackbarButton from '~/components/SnackbarButton.vue'
import { SnackbarModule } from '~/store'

export default Vue.extend({
  auth: false,
  layout: 'unauthorized',
  components: {
    BrandIconButton,
    SnackbarButton
  },
  middleware({ $auth, redirect }) {
    if ($auth.loggedIn) {
      redirect('/record')
    }
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
    loginWithFacebook(): void {
      try {
        this.$auth.loginWith('facebook')
      } catch (e) {
        this.loginError()
      }
    },
    loginError(): void {
      SnackbarModule.error({
        message: 'ログインに失敗しました。'
      })
    }
  }
})
</script>
