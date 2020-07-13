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
import { SettingStore } from '~/store'
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
            label: '消費カロリー',
            backgroundColor: SettingStore.getTotalTimeExercisingColor,
            borderColor: SettingStore.getTotalTimeExercisingColor,
            fill: false,
            hidden: SettingStore.isHiddenTotalCaloriesBurned,
            yAxisID: 'y-axis-1',
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
            type: 'line',
            label: '走行距離',
            borderColor: '#69F0AE',
            backgroundColor: '#69F0AE',
            fill: false,
            hidden: SettingStore.isHiddenTotalDistanceRun,
            yAxisID: 'y-axis-2',
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
            type: 'bar',
            label: '活動時間',
            backgroundColor: '#1976d2',
            yAxisID: 'y-axis-3',
            hidden: SettingStore.isHiddenTotalTimeExercising,
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
        elements: {
          line: {
            tension: SettingStore.isSmoothed ? 0.4 : 0
          }
        },
        legend: {
          onClick(_e, legendItem) {
            switch (legendItem.datasetIndex) {
              case 0:
                SettingStore.toggleHiddenTotalCaloriesBurned()
                break
              case 1:
                SettingStore.toggleHiddenTotalDistanceRun()
                break
              case 2:
                SettingStore.toggleHiddenTotalTimeExercising()
                break
              default:
                throw new Error('Invalid datasetIndex')
            }
          }
        },

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
              id: 'y-axis-1',
              type: 'linear',
              position: 'left',
              gridLines: {
                drawOnChartArea: false
              },
              ticks: {
                callback(value) {
                  return `${value} kcal`
                }
              }
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              position: 'right',
              gridLines: {
                drawOnChartArea: false
              },
              ticks: {
                callback(value) {
                  return `${value} km`
                }
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
