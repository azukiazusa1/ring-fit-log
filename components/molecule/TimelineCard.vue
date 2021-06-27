<template>
  <v-card max-width="90%">
    <v-card-title>
      <span class="text-h6">
        <app-time :date="item.date" format="YYYY-MM-DD" />
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
          <span class="text-h5">31:00</span>
        </v-col>
        <v-col md="2" cols="4"> <span class="text-h5">33.1</span>kcal </v-col>
        <v-col md="2" cols="4"> <span class="text-h5">0.1</span>km </v-col>
        <v-col cols="12">
          "Turns out semicolon-less style is easier and safer in TS because most
          gotcha edge cases are type invalid as well."
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img class="elevation-6" alt="" :src="item.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Evan You</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <good-icon class="mr-2" />
          <span>256</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import GoodIcon from '../atom/icon/GoodIcon.vue'
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
    item: Object,
    required: true
  },
  computed: {
    stamps() {
      return {
        arms: true,
        legs: false,
        stomach: true,
        yoga: false
      }
    }
  }
})
</script>
