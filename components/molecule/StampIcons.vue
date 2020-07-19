<template>
  <span>
    <ArmsIcon :value="stamps.arms" class="mx-2" @click="armsClick" />
    <StomachIcon :value="stamps.stomach" class="mx-2" @click="stomachClick" />
    <LegsIcon :value="stamps.legs" class="mx-2" @click="legsClick" />
    <YogaIcon :value="stamps.yoga" class="mx-2" @click="yogaClick" />
  </span>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import ArmsIcon from '~/components/atom/icon/ArmsIcon.vue'
import StomachIcon from '~/components/atom/icon/StomackIcon.vue'
import LegsIcon from '~/components/atom/icon/LegsIcon.vue'
import YogaIcon from '~/components/atom/icon/YogaIcon.vue'
import { Stamps } from '~/types/record'

export default Vue.extend({
  name: 'StampIcons',
  components: {
    ArmsIcon,
    StomachIcon,
    LegsIcon,
    YogaIcon
  },
  props: {
    stamps: {
      type: Object as PropType<Stamps>,
      required: true
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
