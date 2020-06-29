<template>
  <span>
    <v-btn icon class="mx-2" color="red darken-1"
      ><v-icon>{{ mdiArmFlex }}</v-icon></v-btn
    >
    <v-btn icon class="mx-2" color="yellow accent-4"
      ><v-icon>fas fa-grip-vertical</v-icon></v-btn
    >
    <v-btn icon class="mx-2" color="indigo accent-4"
      ><v-icon>{{ mdiSeatLegroomReduced }}</v-icon></v-btn
    >
    <v-btn icon class="mx-2" color="teal accent-4"
      ><v-icon>fas fa-spa</v-icon></v-btn
    >
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiArmFlex, mdiSeatLegroomReduced } from '@mdi/js'

export default Vue.extend({
  name: 'StampIcons',
  data() {
    return {
      mdiArmFlex,
      mdiSeatLegroomReduced
    }
  }
})
</script>
