<template>
  <div>
    <ChartDateSelector :date="date" :date-range="dateRange" />
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
import ChartDateSelector from '~/components/organism/ChartDateSelector.vue'
import DateRangeSelector from '~/components/molecule/DateRangeSelector.vue'
import BarChart from '~/components/organism/BarChart.vue'
import { ChartsStore, SettingStore, SnackbarModule } from '~/store'
import { DateRange } from '~/types/chart'
import { ms2stringTime } from '~/utils/msConversion'
import isInvalidDate from '~/utils/isInvalidDate'
import { WEEK1, MONTH1, MONTH3, YEAR1 } from '~/config/constant'

type Data = {
  dateRange: DateRange
  date: Date
  selectedDateRange: DateRange[]
}

export default Vue.extend({
  components: {
    ChartDateSelector,
    DateRangeSelector,
    BarChart
  },
  async asyncData({ app, query }): Promise<Data> {
    const dateRange = app.$cookies.get<DateRange>('dateRange') ?? WEEK1
    const selectedDateRange = [dateRange]
    const queryDate = query.date as string
    const date = isInvalidDate(queryDate) ? new Date() : new Date(queryDate)
    try {
      await ChartsStore.fetchChartData({ date, dateRange })
    } catch (e) {
      console.error(e)
      SnackbarModule.error({
        message: 'データの取得に失敗しました。'
      })
    }
    return { dateRange, date, selectedDateRange }
  },
  watchQuery: ['date'],
  data(): Data {
    return {
      dateRange: WEEK1,
      date: new Date(),
      selectedDateRange: []
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
            label(tooltipItem) {
              switch (tooltipItem.datasetIndex) {
                case 0:
                  return `${tooltipItem.value} kcal`
                case 1:
                  return `${tooltipItem.value} km`
                case 2:
                  return ms2stringTime(tooltipItem.value ?? 0)
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
                tooltipFormat: this.tooltipFormat
              },
              ticks: {
                source: 'data'
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
    },
    tooltipFormat(): string {
      return this.dateRange === YEAR1 ? 'YYYY/MM' : 'YYYY/MM/DD（ddd）'
    }
  },
  watch: {
    async dateRange(dateRange: DateRange) {
      this.$cookies.set('dateRange', dateRange)
      if (this.selectedDateRange.includes(dateRange)) return
      this.selectedDateRange.push(dateRange)
      try {
        await ChartsStore.fetchChartData({ date: this.date, dateRange })
      } catch (e) {
        console.error(e)
      }
    }
  }
})
</script>
