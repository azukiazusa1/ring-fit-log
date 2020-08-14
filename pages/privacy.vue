<template>
  <div>プライバシーポリシー</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  auth: false,
  layout({ $auth }) {
    return $auth.loggedIn ? 'default' : 'unauthorized'
  },
  head() {
    return {
      title: 'プライバシーポリシー'
    }
  }
})
</script>
