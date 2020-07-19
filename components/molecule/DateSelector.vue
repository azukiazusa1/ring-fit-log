<template>
  <v-row>
    <v-col md="2" class="d-none d-md-flex">
      <AngleDoubleLeft @click="clickAngleDoubleLeft" />
    </v-col>
    <v-col cols="2" md="2">
      <AngleLeft @click="clickAngleLeft" />
    </v-col>
    <v-col cols="8" md="4">
      <client-only>
        <template #placeholder>
          <h2 class="headline text-center">
            <AppTime :date="date" :format="format" />
          </h2>
        </template>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template #activator="{ on, attrs }">
            <h2 class="headline text-center" v-bind="attrs" v-on="on">
              <AppTime :date="date" :format="format" />
            </h2>
          </template>
          <v-date-picker
            v-model="_date"
            no-title
            locale="ja"
            :day-format="(date) => new Date(date).getDate()"
            :type="pickerType"
            @input="menu = false"
          />
        </v-menu>
      </client-only>
    </v-col>
    <v-col cols="2" md="1" offset-md="1">
      <AngleRight @click="clickAngleRight" />
    </v-col>
    <v-col md="1" offset-md="1" class="d-none d-md-flex">
      <AngleDoubleRight @click="clickAngleDoubleRight" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import AppTime from '~/components/atom/AppTime.vue'
import AngleDoubleLeft from '~/components/atom/icon/AngleDoubleLeft.vue'
import AngleLeft from '~/components/atom/icon/AngleLeft.vue'
import AngleRight from '~/components/atom/icon/AngleRight.vue'
import AngleDoubleRight from '~/components/atom/icon/AngleDoubleRight.vue'

type PickerType = 'date' | 'month' | 'year'

export default Vue.extend({
  name: 'DateSelector',
  components: {
    AppTime,
    AngleDoubleLeft,
    AngleLeft,
    AngleRight,
    AngleDoubleRight
  },
  props: {
    date: {
      type: Date,
      required: true
    },
    format: {
      type: String,
      required: false,
      default: 'YYYY/MM/DD（ddd）'
    },
    pickerType: {
      type: String as PropType<PickerType>,
      required: false,
      default: 'date'
    }
  },
  data() {
    return {
      menu: false
    }
  },
  computed: {
    _date: {
      get(): string {
        return this.$moment(this.date).format()
      },
      set(date: string) {
        this.$emit('changeDate', date)
      }
    }
  },
  methods: {
    clickAngleDoubleLeft() {
      this.$emit('clickAngleDoubleLeft')
    },
    clickAngleLeft() {
      this.$emit('clickAngleLeft')
    },
    clickAngleRight() {
      this.$emit('clickAngleRight')
    },
    clickAngleDoubleRight() {
      this.$emit('clickAngleDoubleRight')
    }
  }
})
</script>
