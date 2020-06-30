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
    @blur="$v._totalDistanceRun.$touch()"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { decimal, between } from 'vuelidate/lib/validators'
import { decimalError, rangeError } from '~/config/validationErrorMessages'

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
      set(totalDistanceRun: string | number | null) {
        if (typeof totalDistanceRun === 'string') {
          this.$emit('update:totalDistanceRun', null)
          return
        }
        this.$emit('update:totalDistanceRun', totalDistanceRun)
      }
    },
    totalDistanceRunErrors(): Array<string> {
      const errors: string[] = []
      if (!this.$v._totalDistanceRun!.$dirty) return errors
      !this.$v._totalDistanceRun!.decimal &&
        errors.push(decimalError('合計走行距離'))
      !this.$v._totalDistanceRun!.between &&
        errors.push(rangeError('合計走行距離', 0, 100))
      !this.$v._totalDistanceRun!.required && errors.push('1')
      return errors
    }
  },
  watch: {
    '$v.$error'() {
      this.$emit('hasError', this.$v.$error)
    },
    validate(value) {
      if (value) this.$v.$touch()
    }
  }
})
</script>
