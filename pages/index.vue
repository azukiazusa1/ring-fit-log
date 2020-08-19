<template>
  <div>
    <LoginButtons />
    <HowTow />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginButtons from '~/components/organism/LoginButtons.vue'
import HowTow from '~/components/organism/HowTow.vue'

export default Vue.extend({
  auth: 'guest',
  layout: 'unauthorized',
  components: {
    LoginButtons,
    HowTow
  }
})
</script>
