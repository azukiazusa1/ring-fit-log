<template>
  <div>
    <span v-if="loggedIn">ログイン中</span>
    <span v-else>ログアウト中</span>
    <v-btn @click="login">Login</v-btn>
    <v-btn @click="logout">Logout</v-btn>
    <v-btn @click="setSnackbar">Snackbar</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SnackbarModule } from '~/store'

type Data = {
  loggedIn: Boolean
}

type DataType = {
  data: Data
}

export default Vue.extend({
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get('/api')
      return { data }
    } catch (e) {
      console.error(e)
    }
  },
  data(): DataType {
    return {
      data: {
        loggedIn: false
      }
    }
  },
  computed: {
    loggedIn(): Boolean {
      return this.data.loggedIn
    }
  },
  methods: {
    login(): void {
      this.$auth.loginWith('github')
    },
    logout(): void {
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
