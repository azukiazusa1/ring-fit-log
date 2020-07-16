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
import { ChartData, ChartOptions, TimeUnit } from 'chart.js'
import DateRangeSelector from '~/components/molecule/DateRangeSelector.vue'
import BarChart from '~/components/organism/BarChart.vue'
import { ChartsStore, SettingStore } from '~/store'
import { DateRange } from '~/types/chart'
import { ms2StirngTime } from '~/utils/msConversion'
import { WEEK1, MONTH1, MONTH3, YEAR1 } from '~/config/constant'

type DataType = {
  dateRange: DateRange
  date: Date
}

export default Vue.extend({
  components: {
    DateRangeSelector,
    BarChart
  },
  asyncData({ app }) {
    const dateRange = app.$cookies.get('dateRange') ?? WEEK1
    return { dateRange }
  },
  data(): DataType {
    return {
      dateRange: WEEK1,
      date: new Date()
    }
  },
  computed: {
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
            data: ChartsStore.getTotalCaloriesBurned(this.date, this.dateRange)
          },
          {
            type: 'line',
            label: '走行距離',
            borderColor: SettingStore.getTotalDistanceRunColor,
            backgroundColor: SettingStore.getTotalDistanceRunColor,
            fill: false,
            hidden: SettingStore.isHiddenTotalDistanceRun,
            yAxisID: 'y-axis-2',
            data: ChartsStore.getTotalDistanceRun(this.date, this.dateRange)
          },
          {
            type: 'bar',
            label: '活動時間',
            backgroundColor: SettingStore.getTotalTimeExercisingColor,
            yAxisID: 'y-axis-3',
            hidden: SettingStore.isHiddenTotalTimeExercising,
            data: ChartsStore.getTotalTimeExercising(this.date, this.dateRange)
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
                unit: this.dateRangeUnit,
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
    },
    dateRangeUnit(): TimeUnit {
      switch (this.dateRange) {
        case WEEK1:
        case MONTH1:
          return 'day'
        case MONTH3:
          return 'week'
        case YEAR1:
          return 'month'
        default:
          return 'day'
      }
    }
  },
  watch: {
    dateRange(newVal: DateRange, oldVal: DateRange) {
      this.$cookies.set('dateRange', newVal)
      if (newVal < oldVal) return
      // try {
      //   await ChartsStore.fetchChartData(this.date, newVal)
      // } catch (e) {
      //   console.error(e)
      // }
    }
  }
})
</script>
