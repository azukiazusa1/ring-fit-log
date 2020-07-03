<template>
  <v-row>
    <v-col md="2" class="d-none d-md-flex">
      <v-btn :to="`/record?date=${prevWeek}`" icon>
        <v-icon>fas fa-angle-double-left</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="2" md="2">
      <v-btn :to="`/record?date=${prevDay}`" icon>
        <v-icon>fas fa-angle-left</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="8" md="4">
      <h2 class="headline text-center">{{ formatedDate }}</h2>
    </v-col>
    <v-col cols="2" md="1" offset-md="1">
      <v-btn :to="`/record?date=${nextDay}`" icon>
        <v-icon>fas fa-angle-right</v-icon>
      </v-btn>
    </v-col>
    <v-col md="1" offset-md="1" class="d-none d-md-flex">
      <v-btn :to="`/record?date=${nextWeek}`" icon>
        <v-icon>fas fa-angle-double-right</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'RecordDateSelector',
  props: {
    date: {
      type: Date,
      required: true
    }
  },
  computed: {
    nextDay(): string {
      return this.$moment(this.date)
        .add(1, 'days')
        .format('YYYY-MM-DD')
    },
    prevDay(): string {
      return this.$moment(this.date)
        .add(-1, 'days')
        .format('YYYY-MM-DD')
    },
    nextWeek(): string {
      return this.$moment(this.date)
        .add(1, 'weeks')
        .format('YYYY-MM-DD')
    },
    prevWeek(): string {
      return this.$moment(this.date)
        .add(-1, 'weeks')
        .format('YYYY-MM-DD')
    },
    formatedDate(): string {
      return this.$moment(this.date).format('YYYY/MM/DD（ddd）')
    }
  }
})
</script>
