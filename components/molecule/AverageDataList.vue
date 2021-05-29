<template>
  <v-data-iterator :items="items" hide-default-footer>
    <template v-slot:header>
      <v-toolbar class="mb-2" color="#ffbb00" dark flat>
        <v-toolbar-title class="font-weight-bold">１日の平均</v-toolbar-title>
      </v-toolbar>
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
import Vue, { PropType } from 'vue'
import { floor } from 'lodash'
import { AverageData } from '~/types/aggregate'
import { ms2stringTime } from '~/utils/msConversion'
import { PRECISION } from '~/config/constant'

export default Vue.extend({
  name: 'AverageDataList',
  props: {
    userAverageData: {
      type: Object as PropType<AverageData>,
      required: true
    },
    averageData: {
      type: Object as PropType<AverageData>,
      required: true
    }
  },
  computed: {
    items() {
      return [
        {
          name: '活動時間',
          my: ms2stringTime(this.userAverageData.avgTimeExercising),
          all: ms2stringTime(this.averageData.avgTimeExercising)
        },
        {
          name: '消費カロリー（kcal）',
          my: floor(this.userAverageData.avgCaloriesBurned, PRECISION),
          all: floor(this.averageData.avgCaloriesBurned, PRECISION)
        },
        {
          name: '走行距離（km）',
          my: floor(this.userAverageData.avgDistanceRun, PRECISION),
          all: floor(this.averageData.avgDistanceRun, PRECISION)
        }
      ]
    }
  }
})
</script>
