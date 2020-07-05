<template>
  <v-row>
    <v-col cols="4">
      <RecordItem :value="totalTimeExercising">
        <template #title>活動時間</template>
      </RecordItem>
    </v-col>
    <v-col cols="4">
      <RecordItem :value="totalCaloriesBurned">
        <template #title>消費カロリー</template>
        <template #unit>kcal</template>
      </RecordItem>
    </v-col>
    <v-col cols="4">
      <RecordItem :value="totalDistanceRun">
        <template #title>走行距離</template>
        <template #unit>km</template>
      </RecordItem>
    </v-col>
    <v-col class="text-center">
      <SubmitButton @click="click">当日の記録を入力する</SubmitButton>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import RecordItem from '~/components/atom/RecordItem.vue'
import SubmitButton from '~/components/atom/SubmitButton.vue'
import { Record } from '~/types/record'

export default Vue.extend({
  name: 'ShowRecord',
  components: {
    RecordItem,
    SubmitButton
  },
  props: {
    record: {
      type: Object as PropType<Record>,
      required: false,
      default: null
    }
  },
  computed: {
    totalTimeExercising(): string {
      return this.record?.totalTimeExercising
    },
    totalCaloriesBurned(): number | null {
      return this.record?.totalCaloriesBurned
    },
    totalDistanceRun(): number | null {
      return this.record?.totalDistanceRun
    }
  },
  methods: {
    click() {
      this.$emit('buttonClick')
    }
  }
})
</script>
