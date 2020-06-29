<template>
  <span>
    <v-btn @click="armsClick" icon class="mx-2" :color="armsColor"
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
import Vue, { PropType } from 'vue'
import { mdiArmFlex, mdiSeatLegroomReduced } from '@mdi/js'
import { Stamps } from '~/types/record'

export default Vue.extend({
  name: 'StampIcons',
  props: {
    stamps: {
      type: Object as PropType<Stamps>,
      required: true
    }
  },
  data() {
    return {
      mdiArmFlex,
      mdiSeatLegroomReduced
    }
  },
  computed: {
    armsColor(): string {
      return this.stamps.arms ? 'red darken-1' : ''
    }
  },
  methods: {
    armsClick() {
      this.$emit('armsClick', !this.stamps.arms)
    }
  }
})
</script>
