<template>
  <span>
    <v-btn :color="armsColor" icon class="mx-2" @click="armsClick">
      <v-icon>{{ mdiArmFlex }}</v-icon>
    </v-btn>
    <v-btn :color="stmackColor" icon class="mx-2" @click="stomachClick"
      ><v-icon>fas fa-grip-vertical </v-icon>
    </v-btn>
    <v-btn :color="legsColor" icon class="mx-2" @click="legsClick">
      <v-icon>{{ mdiSeatLegroomReduced }}</v-icon>
    </v-btn>
    <v-btn :color="yogaColor" icon class="mx-2" @click="yogaClick">
      <v-icon>fas fa-spa</v-icon>
    </v-btn>
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
    },
    stomachColor(): string {
      return this.stamps.stomach ? 'yellow accent-4' : ''
    },
    legsColor(): string {
      return this.stamps.legs ? 'indigo accent-4' : ''
    },
    yogaColor(): string {
      return this.stamps.yoga ? 'teal accent-4' : ''
    }
  },
  methods: {
    armsClick() {
      this.$emit('armsClick')
    },
    stomachClick() {
      this.$emit('stomachClick')
    },
    legsClick() {
      this.$emit('legsClick')
    },
    yogaClick() {
      this.$emit('yogaClick')
    }
  }
})
</script>
