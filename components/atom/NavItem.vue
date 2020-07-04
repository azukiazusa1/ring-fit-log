<template>
  <v-btn :to="to" :text="text">
    <template v-if="prependIcon">
      <v-icon v-if="icon" class="mr-5" small>{{ icon }}</v-icon>
      <span class="font-weight-bold">{{ title }}</span>
    </template>
    <template v-else>
      <span>{{ title }}</span>
      <v-icon v-if="icon" small>{{ icon }}</v-icon>
    </template>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NavItem',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false,
      default: ''
    },
    prependIcon: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: true
    },
    text: {
      type: Boolean,
      required: false,
      default: false
    }
  }
})
</script>
