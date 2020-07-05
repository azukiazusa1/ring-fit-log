<template>
  <v-row>
    <client-only>
      <v-date-picker
        v-model="date"
        color="secondary"
        full-width
        :events="functionEvents"
        locale="ja"
        :day-format="(date) => new Date(date).getDate()"
      ></v-date-picker>
      <v-skeleton-loader slot="placeholder" type="date-picker-days" />
      {{ date }}
    </client-only>
    <v-row>
      <v-col cols="3">a</v-col>
      <v-col cols="3">a</v-col>
      <v-col cols="3">a</v-col>
    </v-row>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { RecordsStore } from '~/store'
export default Vue.extend({
  asyncData({ $moment }) {
    return { date: $moment().format('YYYY-MM-DD') }
  },
  data() {
    return {
      date: ''
    }
  },
  methods: {
    functionEvents(date: string) {
      return RecordsStore.isRecoded(new Date(date))
    }
  }
})
</script>
