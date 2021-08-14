<template>
  <v-card>
    <v-card-title>
      <span class="text-h6">
        <app-time :date="item.createdAt" format="YYYY/MM/DD" />
      </span>
      <span class="ml-2">
        <ArmsIcon v-if="stamps.arms" value :ripple="false" />
        <StomachIcon v-if="stamps.stomach" value />
        <LegsIcon v-if="stamps.legs" value />
        <YogaIcon v-if="stamps.yoga" value />
      </span>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col md="2" cols="4">
          <span class="text-h6">{{ totalTimeExercising }}</span>
        </v-col>
        <v-col md="2" cols="4">
          <span class="text-h6">{{ item.record.totalCaloriesBurned }}</span
          >kcal
        </v-col>
        <v-col md="2" cols="4">
          <span class="text-h6">{{ item.record.totalDistanceRun }}</span
          >km
        </v-col>
        <v-col v-if="item.record.comment" cols="12">
          {{ item.record.comment }}
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img class="elevation-6" alt="" :src="item.user.photoURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ item.user.username }}</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <good-icon class="mr-2" :value="item.isLiked" @click="toggleLike" />
          <span :class="color" class="pointer" @click="toggleLike">
            {{ item.likeCount }}
          </span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Timeline } from '~/types/timeline'
import { ms2stringTime } from '~/utils/msConversion'
import GoodIcon from '~/components/atom/icon/GoodIcon.vue'
import ArmsIcon from '~/components/atom/icon/ArmsIcon.vue'
import StomachIcon from '~/components/atom/icon/StomackIcon.vue'
import LegsIcon from '~/components/atom/icon/LegsIcon.vue'
import YogaIcon from '~/components/atom/icon/YogaIcon.vue'
import AppTime from '~/components/atom/AppTime.vue'
import { Stamps } from '~/types/record'

export default Vue.extend({
  components: {
    AppTime,
    GoodIcon,
    ArmsIcon,
    StomachIcon,
    LegsIcon,
    YogaIcon
  },
  props: {
    item: {
      type: Object as PropType<Timeline>,
      required: true
    }
  },
  computed: {
    stamps(): Stamps {
      console.log(this.item)
      return this.item.record.stamps
    },
    totalTimeExercising(): string {
      return ms2stringTime(this.item.record.totalTimeExercising)
    },
    color(): string {
      return this.item.isLiked ? 'orange--text text--darken-1' : ''
    }
  },
  methods: {
    toggleLike(): void {
      this.$emit('toggleLike', { id: this.item._id })
    }
  }
})
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
