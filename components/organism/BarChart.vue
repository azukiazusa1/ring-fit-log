<script lang="ts">
import Vue, { PropType } from 'vue'
import { ChartData, ChartOptions } from 'chart.js'
import { Bar, Line, mixins } from 'vue-chartjs'

export default Vue.extend({
  mixins: [Bar, Line, mixins.reactiveProp],
  props: {
    chartData: {
      type: Object as PropType<ChartData>,
      required: true
    },
    options: {
      type: Object as PropType<ChartOptions>,
      required: true
    }
  },
  watch: {
    options: {
      handler(newOption: ChartOptions, oldOption: ChartOptions) {
        ;(this as any).renderChart(this.chartData, this.options)
      },
      deep: true
    }
  },
  mounted(): void {
    ;(this as any).renderChart(this.chartData, this.options)
  }
})
</script>
