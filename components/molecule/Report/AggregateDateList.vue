<template>
  <v-data-iterator :items="items" hide-default-footer>
    <template v-slot:header>
      <report-header>{{ header }} </report-header>
    </template>

    <template v-slot:default="props">
      <v-row>
        <v-col
          v-for="item in props.items"
          :key="item.name"
          cols="12"
          sm="6"
          md="4"
          lg="4"
        >
          <v-card>
            <v-card-title class="subheading font-weight-bold">
              {{ item.name }}
            </v-card-title>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item>
                <v-list-item-content>私の記録:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ item.my }}
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>みんなの記録:</v-list-item-content>
                <v-list-item-content class="align-end">
                  {{ item.all }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script lang="ts">
import Vue from 'vue'
import { floor } from 'lodash'
import ReportHeader from '@/components/atom/Report/Header.vue'
import { ms2stringTime } from '~/utils/msConversion'
import { PRECISION } from '~/config/constant'

export default Vue.extend({
  name: 'AggregateDataList',
  components: {
    ReportHeader
  },
  props: {
    header: {
      type: String,
      required: false,
      default: ''
    },
    userTimeExercising: {
      type: Number,
      default: 0
    },
    userCaloriesBurned: {
      type: Number,
      default: 0
    },
    userDistanceRun: {
      type: Number,
      default: 0
    },
    timeExercising: {
      type: Number,
      default: 0
    },
    caloriesBurned: {
      type: Number,
      default: 0
    },
    distanceRun: {
      type: Number,
      default: 0
    }
  },
  computed: {
    items() {
      return [
        {
          name: '活動時間',
          my: ms2stringTime(this.userTimeExercising),
          all: ms2stringTime(this.timeExercising)
        },
        {
          name: '消費カロリー（kcal）',
          my: floor(this.userCaloriesBurned, PRECISION),
          all: floor(this.caloriesBurned, PRECISION)
        },
        {
          name: '走行距離（km）',
          my: floor(this.userDistanceRun, PRECISION),
          all: floor(this.distanceRun, PRECISION)
        }
      ]
    }
  }
})
</script>
