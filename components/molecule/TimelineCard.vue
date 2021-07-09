<template>
  <v-card max-width="90%">
    <v-card-title>
      <span class="text-h6">
        <app-time :date="item.createdAt" format="YYYY-MM-DD" />
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
          <span class="text-h5">{{ item.record.totalTimeExercising }}</span>
        </v-col>
        <v-col md="2" cols="4">
          <span class="text-h5">{{ item.record.totalCaloriesBurned }}</span
          >kcal
        </v-col>
        <v-col md="2" cols="4">
          <span class="text-h5">{{ item.record.totalDistanceRun }}</span
          >km
        </v-col>
        <v-col cols="12">
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
          <good-icon class="mr-2" :value="isLiked" @click="toggleLike" />
          <span :class="color" class="pointer" @click="toggleLike">
            {{ likeCount }}
          </span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Timeline } from '~/types/timeline'
import GoodIcon from '~/components/atom/icon/GoodIcon.vue'
import ArmsIcon from '~/components/atom/icon/ArmsIcon.vue'
import StomachIcon from '~/components/atom/icon/StomackIcon.vue'
import LegsIcon from '~/components/atom/icon/LegsIcon.vue'
import YogaIcon from '~/components/atom/icon/YogaIcon.vue'
import AppTime from '~/components/atom/AppTime.vue'

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
  data() {
    return {
      isLiked: false,
      likeCount: 0
    }
  },
  computed: {
    stamps() {
      return this.item.record.stamps
    },
    color(): string {
      return this.isLiked ? 'orange--text text--darken-1' : ''
    }
  },
  created(): void {
    this.isLiked = this.item.isLiked
    this.likeCount = this.item.likeCount
  },
  methods: {
    toggleLike(): void {
      this.isLiked = !this.isLiked
      if (this.isLiked) {
        this.likeCount++
      } else {
        this.likeCount--
      }
      this.$emit('toggleLike')
    }
  }
})
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
