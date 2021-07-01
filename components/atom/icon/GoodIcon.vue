<template>
  <v-btn :color="color" icon @click="click">
    <v-icon>fas fa-thumbs-up</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'GoodIcon',
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    color(): string {
      return this.value ? 'orange darken-1' : ''
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
})
</script>
