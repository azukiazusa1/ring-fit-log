<template>
  <div>
    <h1>グラフ</h1>
    <date-range-selector :date-range.sync="dateRange" />
    <client-only>
      <BarChart :chart-data="chartData" :options="options" />
      <template #placeholder>
        <div class="text-center">
          <v-progress-circular
            indeterminate
            size="64"
            color="main"
          ></v-progress-circular>
        </div>
      </template>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ChartData, ChartOptions } from 'chart.js'
import DateRangeSelector from '~/components/molecule/DateRangeSelector.vue'
import BarChart from '~/components/organism/BarChart.vue'
import { DateRange } from '~/types/chart'

export default Vue.extend({
  components: {
    DateRangeSelector,
    BarChart
  },
  computed: {
    dateRange: {
      get(): DateRange {
        return this.$cookies.get('dateRange') || '1-week'
      },
      set(dateRagne: DateRange) {
        this.$cookies.set('dateRange', dateRagne)
      }
    },
    chartData(): ChartData {
      return {
        datasets: [
          {
            type: 'line',
            label: ['Data One'],
            backgroundColor: '#f87979',
            fill: false,
            yAxisID: 'y-axis-1',
            data: [
              {
                x: '1995-12-17T00:00:00',
                y: 1.19
              },
              {
                x: '1995-12-18T00:00:00',
                y: 0.87
              },
              {
                x: '1995-12-20T00:00:00',
                y: 2.01
              },
              {
                x: '1995-12-21T00:00:00',
                y: 0.77
              },
              {
                x: '1995-12-22T00:00:00',
                y: 1.32
              }
            ]
          },
          {
            type: 'line',
            label: ['Data One'],
            backgroundColor: '#f87979',
            fill: false,
            yAxisID: 'y-axis-2',
            data: [
              {
                x: '1995-12-17T00:00:00',
                y: 85.08
              },
              {
                x: '1995-12-18T00:00:00',
                y: 77.01
              },
              {
                x: '1995-12-20T00:00:00',
                y: 118.73
              },
              {
                x: '1995-12-21T00:00:00',
                y: 33.44
              },
              {
                x: '1995-12-22T00:00:00',
                y: 57.63
              }
            ]
          },
          {
            type: 'bar',
            yAxisID: 'y-axis-3', // 追加
            data: [
              {
                x: '1995-12-17T00:00:00',
                y: this.$moment(
                  '1970-01-01 00:20:14.000 +0000',
                  'YYYY-MM-DD HH:mm:ss.SSS Z'
                ).format('x')
              },
              {
                x: '1995-12-18T00:00:00',
                y: this.$moment(
                  '1970-01-01 00:13:14.000 +0000',
                  'YYYY-MM-DD HH:mm:ss.SSS Z'
                ).format('x')
              },
              {
                x: '1995-12-20T00:00:00',
                y: this.$moment(
                  '1970-01-01 00:33:33.000 +0000',
                  'YYYY-MM-DD HH:mm:ss.SSS Z'
                ).format('x')
              },
              {
                x: '1995-12-21T00:00:00',
                y: this.$moment(
                  '1970-01-01 00:9:14.000 +0000',
                  'YYYY-MM-DD HH:mm:ss.SSS Z'
                ).format('x')
              },
              {
                x: '1995-12-22T00:00:00',
                y: this.$moment(
                  '1970-01-01 00:35:14.000 +0000',
                  'YYYY-MM-DD HH:mm:ss.SSS Z'
                ).format('x')
              }
            ]
          }
        ]
      } as ChartData
    },
    options(): ChartOptions {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'MM/DD',
                  week: 'YYYY/MM',
                  month: 'YYYY/MM'
                },
                tooltipFormat: 'YYYY/MM/DD（ddd）'
              }
            }
          ],
          yAxes: [
            {
              id: 'y-axis-1', // Y軸のID
              type: 'linear', // linear固定
              position: 'left', // どちら側に表示される軸か？
              gridLines: {
                // このオプションを追加
                drawOnChartArea: false
              }
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              position: 'right',
              gridLines: {
                // このオプションを追加
                drawOnChartArea: false
              }
            },
            {
              id: 'y-axis-3',
              ticks: {
                display: false
              }
            }
          ]
        }
      } as ChartOptions
    }
  }
})
</script>
