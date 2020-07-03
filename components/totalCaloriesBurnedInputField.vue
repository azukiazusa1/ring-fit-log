<template>
  <span>
    <v-text-field
      v-model.number="_totalCaloriesBurned"
      :error-messages="totalCaloriesBurnedErrors"
      prepend-icon="as fa-fire"
      type="number"
      step="0.01"
      outlined
      dense
      color="orange darken-1"
      suffix="kcal"
      label="合計消費カロリー"
      @input="$v._totalCaloriesBurned.$touch()"
      @blur="onBlur"
    ></v-text-field>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { decimal, between } from 'vuelidate/lib/validators'
import { floor } from 'lodash'
import { decimalError, rangeError } from '~/config/validationErrorMessages'
import { PRECISION } from '~/config/constant'

export default Vue.extend({
  name: 'TotalCaloriesBurnedInputField',
  mixins: [validationMixin],
  validations: {
    _totalCaloriesBurned: {
      between: between(0, 999.99),
      decimal
    }
  },
  props: {
    totalCaloriesBurned: {
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
    _totalCaloriesBurned: {
      get(): string | number | null {
        return this.totalCaloriesBurned
      },
      set(totalCaloriesBurned: string | number) {
        if (typeof totalCaloriesBurned === 'string') {
          this.$emit('update:totalCaloriesBurned', null)
          return
        }
        this.$emit(
          'update:totalCaloriesBurned',
          floor(totalCaloriesBurned, PRECISION)
        )
      }
    },
    totalCaloriesBurnedErrors(): Array<string> {
      const errors: string[] = []
      if (!this.$v._totalCaloriesBurned!.$dirty) return errors
      !this.$v._totalCaloriesBurned!.decimal &&
        errors.push(decimalError('合計消費カロリー'))
      !this.$v._totalCaloriesBurned!.between &&
        errors.push(rangeError('合計消費カロリー', 0, 999.99))
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
        this._totalCaloriesBurned === null ||
        typeof this._totalCaloriesBurned === 'string'
      ) {
        return
      }
      this.$v.$touch()
      const target = e.target as HTMLInputElement
      target.value = this._totalCaloriesBurned.toString()
    }
  }
})
</script>
