<template>
  <v-form @submit.prevent="submit">
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model.number="record.totalTimeExercising.hour"
          prepend-icon="fas fa-stopwatch"
          outlined
          dense
          color="orange darken-1"
          label="時間"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model.number="record.totalTimeExercising.minute"
          outlined
          dense
          color="orange darken-1"
          label="分"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model.number="record.totalTimeExercising.second"
          outlined
          dense
          color="orange darken-1"
          label="秒"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model.number="record.totalDistanceRun"
          prepend-icon="fas fa-running"
          outlined
          dense
          color="orange darken-1"
          suffix="km"
          label="合計走行距離"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model.number="record.totalCaloriesBurned"
          prepend-icon="fas fa-fire"
          outlined
          dense
          color="orange darken-1"
          suffix="kcal"
          label="合計消費カロリー"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-card class="pa-2 text-center center" rounded outlined>
          <StampIcons
            :stamps.sync="record.stamps"
            @armsClick="armsClick"
          ></StampIcons>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <SubmitButton @click="submit">{{ submitButtonText }}</SubmitButton>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { cloneDeep } from 'lodash'
import SubmitButton from '~/components/SubmitButton.vue'
import StampIcons from '~/components/StampIcons.vue'
import { Record } from '~/types/record'

type Data = {
  record: Partial<Record>
}

const initialData: Partial<Record> = {
  totalDistanceRun: undefined,
  totalCaloriesBurned: undefined,
  totalTimeExercising: {
    hour: '',
    minute: '',
    second: ''
  },
  date: '',
  stamps: {
    arms: false,
    stomach: false,
    legs: false,
    yoga: false
  }
}

export default Vue.extend({
  name: 'RecordFormArea',
  components: {
    SubmitButton,
    StampIcons
  },
  props: {
    propsRecord: {
      type: Object as PropType<Record | undefined>,
      required: false,
      default: undefined
    },
    isCreateMode: {
      type: Boolean,
      required: true
    }
  },
  data(): Data {
    return {
      record: initialData
    }
  },
  computed: {
    submitButtonText(): string {
      return this.isCreateMode ? '登録する' : '更新する'
    }
  },
  watch: {
    propsRecord: {
      immediate: true,
      handler() {
        if (!this.propsRecord) {
          this.record = initialData
        } else {
          this.record = cloneDeep(this.propsRecord)
        }
      }
    }
  },
  methods: {
    armsClick() {
      this.record.stamps!.arms = !this.record.stamps!.arms
    },
    submit() {
      console.log(this.record)
    }
  }
})
</script>
