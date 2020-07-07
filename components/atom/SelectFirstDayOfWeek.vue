<template>
  <v-select
    :items="items"
    :value="day"
    label="カレンダーの開始日"
    hint="カレンダーの一番左側に配置する曜日を変更します。"
    persistent-hint
    @change="change"
  ></v-select>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Week } from '~/types/setting'
import { JAPANESE_DAYS } from '~/config/constant'

type Items = {
  value: number
  text: string
}

export default Vue.extend({
  name: 'SelectFirstDayOfWeek',
  props: {
    day: {
      type: Number as PropType<Week>,
      required: true
    }
  },
  computed: {
    items(): Items[] {
      const items: Items[] = []
      JAPANESE_DAYS.forEach((text, value) => {
        items.push({ text, value })
      })
      return items
    }
  },
  methods: {
    change(v: Week) {
      this.$emit('change', v)
    }
  }
})
</script>
