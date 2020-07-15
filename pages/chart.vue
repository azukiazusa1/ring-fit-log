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
import { ms2StirngTime, stringTime2ms } from '~/utils/msConversion'
import { WEEK1, MONTH1, MONTH3, YEAR1 } from '~/config/constant'

export default Vue.extend({
  components: {
    DateRangeSelector,
    BarChart
  },
  computed: {
    dateRange: {
      get(): DateRange {
        return this.$cookies.get('dateRange') || WEEK1
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
            backgroundColor: SettingStore.getTotalCaloriesBurnedColor,
            borderColor: SettingStore.getTotalCaloriesBurnedColor,
            fill: false,
            hidden: SettingStore.isHiddenTotalCaloriesBurned,
            yAxisID: 'y-axis-1',
            data: [
              {
                x: '1995-12-01T00:00:00',
                y: 85.08
              },
              {
                x: '1995-12-18T00:00:00',
                y: 77.01
              },
              {
                x: '1995-12-19T00:00:00',
                y: 0
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
                x: '1995-12-31T00:00:00',
                y: 0
              }
            ]
          },
          {
            type: 'line',
            label: '走行距離',
            borderColor: SettingStore.getTotalDistanceRunColor,
            backgroundColor: SettingStore.getTotalDistanceRunColor,
            fill: false,
            hidden: SettingStore.isHiddenTotalDistanceRun,
            yAxisID: 'y-axis-2',
            data: [
              {
                x: '1995-12-01T00:00:00',
                y: 1.19
              },
              {
                x: '1995-12-18T00:00:00',
                y: 0.87
              },
              {
                x: '1995-12-19T00:00:00',
                y: 0
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
                x: '1995-12-31T00:00:00',
                y: 0
              }
            ]
          },
          {
            type: 'bar',
            label: '活動時間',
            backgroundColor: SettingStore.getTotalTimeExercisingColor,
            yAxisID: 'y-axis-3',
            hidden: SettingStore.isHiddenTotalTimeExercising,
            data: [
              {
                x: '1995-12-01T00:00:00',
                y: stringTime2ms('00:24:14')
              },
              {
                x: '1995-12-18T00:00:00',
                y: stringTime2ms('00:13:14')
              },
              {
                x: '1995-12-19T00:00:00',
                y: 0
              },
              {
                x: '1995-12-20T00:00:00',
                y: stringTime2ms('00:33:33')
              },
              {
                x: '1995-12-21T00:00:00',
                y: stringTime2ms('00:09:14')
              },
              {
                x: '1995-12-31T00:00:00',
                y: stringTime2ms('00:00:00')
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
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              switch (tooltipItem.datasetIndex) {
                case 0:
                  return `${tooltipItem.value} kcal`
                case 1:
                  return `${tooltipItem.value} km`
                case 2:
                  return ms2StirngTime(tooltipItem.value ?? 0)
                default:
                  throw new Error('Invalid datasetIndex')
              }
            }
          }
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'month',
                displayFormats: {
                  day: 'MM/DD',
                  week: 'YYYY/MM/DD',
                  month: 'YYYY/MM'
                },
                tooltipFormat: 'YYYY/MM/DD（ddd）'
              },
              gridLines: {
                display: SettingStore.getGridLineX
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
              },
              gridLines: {
                drawOnChartArea: SettingStore.getGridLineY
              }
            }
          ]
        }
      } as ChartOptions
    }
  }
})
</script>
