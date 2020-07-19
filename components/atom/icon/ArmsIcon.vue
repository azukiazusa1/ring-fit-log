<template>
  <v-btn :color="color" icon @click="click">
    <v-icon>{{ mdiArmFlex }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { mdiArmFlex } from '@mdi/js'
import Vue from 'vue'

export default Vue.extend({
  name: 'ArmsIcon',
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      mdiArmFlex
    }
  },
  computed: {
    color(): string {
      return this.value ? 'red darken-1' : ''
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
})
</script>
