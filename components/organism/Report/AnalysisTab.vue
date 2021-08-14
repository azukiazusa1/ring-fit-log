<template>
  <div>
    <report-header>よく運動する時間</report-header>
    <div class="pa-4 text-body-1">
      <p>あなたはよく{{ userHour }}時頃に運動しているようです。</p>
      <p>全体では、{{ hour }}時頃に運動している人が多いようです。</p>
    </div>
    <bar-chart :chart-data="chartData" :options="options" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ChartData, ChartOptions } from 'chart.js'
import ReportHeader from '@/components/atom/Report/Header.vue'
import { AggregateStore } from '~/store'
import BarChart from '~/components/organism/BarChart.vue'

export default Vue.extend({
  components: {
    ReportHeader,
    BarChart
  },
  computed: {
    userHour(): number | undefined {
      return AggregateStore.getUserMostFrequentTime?.hour
    },
    hour(): number | undefined {
      return AggregateStore.getMostFrequentTime?.hour
    },
    chartData(): ChartData {
      return {
        labels: [...Array(24)].map((_, i) => `${i}時`),
        datasets: [
          {
            type: 'bar',
            label: 'わたし',
            backgroundColor: '#1976d2',
            fill: false,
            data: AggregateStore.getUserFrequentTimes.map((v) => v.percentage)
          },
          {
            type: 'bar',
            label: 'みんな',
            backgroundColor: '#f87979',
            data: AggregateStore.getFrequentTimes.map((v) => v.percentage)
          }
        ]
      }
    },
    options(): ChartOptions {
      return {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
})
</script>
