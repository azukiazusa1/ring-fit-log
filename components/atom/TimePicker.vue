<template>
  <v-menu v-model="active" :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ on }">
      <v-text-field
        readonly
        clearable
        v-model="_value"
        v-bind="$attrs"
        v-on="{ ...$listeners, ...on }"
      />
    </template>
    <v-card class="d-flex align-center">
      <v-select
        label="時"
        dense
        hide-details
        class="_v-digital-time-picker__select pt-0 mt-0 align-center"
        rounded
        :items="hours"
        v-model="hourValue"
      />
      <span class="_v-digital-time-picker__comma">
        :
      </span>
      <v-select
        label="分"
        dense
        hide-details
        class="_v-digital-time-picker__select pt-0 mt-0 align-center"
        :items="minutes"
        rounded
        v-model="minuteValue"
      />
      <span class="_v-digital-time-picker__comma">
        :
      </span>
      <v-select
        label="秒"
        dense
        hide-details
        class="_v-digital-time-picker__select pt-0 mt-0 align-center"
        :items="seconds"
        rounded
        v-model="secondValue"
      />
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'

interface data {
  active: boolean
  hours: string[]
  minutes: string[]
  seconds: string[]
}

const ZERO = '00'

function generateNumbStringArray(length: number): string[] {
  return Array.from({ length }, (value, index) =>
    index.toString().padStart(2, '0')
  )
}
export default Vue.extend({
  name: 'VTimePicker',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data(): data {
    return {
      active: false,
      hours: generateNumbStringArray(24),
      minutes: generateNumbStringArray(60),
      seconds: generateNumbStringArray(60)
    }
  },
  computed: {
    _value: {
      get(): string {
        return this.value
      },
      set(value: string) {
        this.$emit('update:value', value)
      }
    },
    splitValue(): string[] {
      return this.value.split(':')
    },
    hourValue: {
      get(): string {
        return this.splitValue[0]
      },
      set(hour: string) {
        this._value = `${hour}:${this.minuteValue ?? ZERO}:${this.secondValue ||
          ZERO}`
      }
    },
    minuteValue: {
      get(): string {
        return this.splitValue[1]
      },
      set(minute: string) {
        this._value = `${this.hourValue || ZERO}:${minute}:${this.secondValue ||
          ZERO}`
      }
    },
    secondValue: {
      get(): string {
        return this.splitValue[2]
      },
      set(second: string) {
        this._value = `${this.hourValue || ZERO}:${this.minuteValue ||
          ZERO}:${second}`
      }
    }
  }
})
</script>

<style lang="scss" scoped>
$font-size: 16px !default;
._v-digital-time-picker {
  &__select {
    height: 60px;
  }
  &__comma {
    font-size: $font-size;
  }
}
.v-menu__content {
  min-width: unset !important;
}
.v-menu__content ::v-deep {
  .v-select__selections {
    & > .v-select__selection.v-select__selection--comma {
      margin: 0 auto;
    }
  }
}
</style>
