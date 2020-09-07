<template>
  <div>ログイン中...</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Cookie from 'universal-cookie'
import getLoginUser from '~/utils/getLoginUser'
const cookie = new Cookie()

export default Vue.extend({
  auth: false,
  layout: 'unauthorized',
  async mounted() {
    if (this.$auth.$state.strategy !== 'twitter') return
    const res = await this.$axios.get('/api/auth/twitter/callback', {
      params: this.$route.query
    })
    this.$auth.setUser(res.data.user)
    cookie.set('userInfo', JSON.stringify(getLoginUser(this.$auth)), {
      maxAge: 60 * 60 * 24 * 365
    })
    this.$auth.setToken('twitter', this.$route.query.oauth_token as string)
    this.$router.push('/record')
  }
})
</script>
