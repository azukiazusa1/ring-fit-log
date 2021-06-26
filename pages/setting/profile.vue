<template>
  <v-card class="wrapper">
    <setting-page-title>プロフィールの設定</setting-page-title>
    <v-card-text>
      <profile-setting-form :profile="user" @submit="onSubmit" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import SettingPageTitle from '~/components/atom/SettingPageTitle.vue'
import ProfileSettingForm from '@/components/molecule/ProfileSettingForm.vue'
import getLoginUser from '~/utils/getLoginUser'
import { LoginUser } from '~/types/auth'

export default Vue.extend({
  components: {
    SettingPageTitle,
    ProfileSettingForm
  },
  computed: {
    user(): LoginUser {
      return this.$cookies.get('userInfo') || getLoginUser(this.$auth)
    }
  },
  methods: {
    async onSubmit({ username }: { username: string }) {
      const { data } = await this.$axios.put('/api/users', {
        username,
        photoURL: this.user.photoURL
      })
      this.$cookies.set('userInfo', JSON.stringify(data), {
        maxAge: 60 * 60 * 24 * 365,
        path: '/'
      })
    }
  },
  head() {
    return {
      title: '設定 - プロフィール'
    }
  }
})
</script>

<style scoped>
.wrapper {
  max-width: 980px;
  margin: 0 auto;
}
</style>
