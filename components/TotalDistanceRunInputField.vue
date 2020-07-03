<template>
  <v-text-field
    v-model.number="_totalDistanceRun"
    :error-messages="totalDistanceRunErrors"
    prepend-icon="fas fa-running"
    type="number"
    outlined
    dense
    color="orange darken-1"
    suffix="km"
    label="合計走行距離"
    @input="$v._totalDistanceRun.$touch()"
    @blur="onBlur"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { decimal, between } from 'vuelidate/lib/validators'
import { floor } from 'lodash'
import { decimalError, rangeError } from '~/config/validationErrorMessages'
import { PRECISION } from '~/config/constant'

export default Vue.extend({
  name: 'TotalDistanceRunInputField',
  mixins: [validationMixin],
  validations: {
    _totalDistanceRun: {
      between: between(0, 100),
      decimal
    }
  },
  props: {
    totalDistanceRun: {
      type: Number,
      required: false,
      default: null
    },
    validate: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    _totalDistanceRun: {
      get(): string | number | null {
        return this.totalDistanceRun
      },
      set(totalDistanceRun: string | number) {
        if (typeof totalDistanceRun === 'string') {
          this.$emit('update:totalDistanceRun', null)
          return
        }
        this.$emit(
          'update:totalDistanceRun',
          floor(totalDistanceRun, PRECISION)
        )
      }
    },
    totalDistanceRunErrors(): Array<string> {
      const errors: string[] = []
      if (!this.$v._totalDistanceRun!.$dirty) return errors
      !this.$v._totalDistanceRun!.decimal &&
        errors.push(decimalError('合計走行距離'))
      !this.$v._totalDistanceRun!.between &&
        errors.push(rangeError('合計走行距離', 0, 100))
      return errors
    }
  },
  watch: {
    '$v.$error'() {
      this.$emit('update:hasError', this.$v.$error)
    },
    validate(value) {
      if (value) this.$v.$touch()
    }
  },
  methods: {
    onBlur(e: FocusEvent) {
      if (
        this.totalDistanceRun === null ||
        typeof this.totalDistanceRun === 'string'
      ) {
        return
      }
      this.$v.$touch()
      const target = e.target as HTMLInputElement
      target.value = this.totalDistanceRun.toString()
    }
  }
})
</script>
