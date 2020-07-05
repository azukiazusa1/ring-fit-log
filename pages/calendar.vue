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
    </client-only>
    <ShowRecord :record="record" @buttonClick="buttonClick"></ShowRecord>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import ShowRecord from '~/components/molecule/ShowRecord.vue'
import { RecordsStore } from '~/store'
import { Record } from '~/types/record'

export default Vue.extend({
  components: {
    ShowRecord
  },
  async asyncData({ $moment }) {
    const now = new Date()
    await RecordsStore.fetchRecordByMonth(now)
    return { date: $moment(now).format('YYYY-MM-DD') }
  },
  data() {
    return {
      date: ''
    }
  },
  computed: {
    record(): Record | undefined {
      return RecordsStore.getRecordByDate(new Date(this.date))
    }
  },
  methods: {
    functionEvents(date: string) {
      return RecordsStore.isRecoded(new Date(date))
    },
    buttonClick() {
      this.$router.push(`/record?date=${this.date}`)
    }
  }
})
</script>
