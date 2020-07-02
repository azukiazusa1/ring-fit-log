<template>
  <v-text-field
    v-model="_totalTimeExercising"
    :error-messages="totalTimeExercisingErrors"
    prepend-icon="fas fa-stopwatch"
    type="time"
    step="1"
    outlined
    dense
    color="orange darken-1"
    label="活動時間"
    @input="$v._totalTimeExercising.$touch()"
    @blur="$v._totalTimeExercising.$touch()"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { helpers } from 'vuelidate/lib/validators'
const time = helpers.regex('time', /^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)

export default Vue.extend({
  name: 'TotalTimeExercisingInputField',
  mixins: [validationMixin],
  validations: {
    _totalTimeExercising: {
      time
    }
  },
  props: {
    totalTimeExercising: {
      type: String,
      required: true
    },
    validate: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    _totalTimeExercising: {
      get(): string {
        return this.totalTimeExercising
      },
      set(totalTimeExercising: string) {
        this.$emit('update:totalTimeExercising', totalTimeExercising)
      }
    },
    totalTimeExercisingErrors(): Array<string> {
      const errors: string[] = []
      if (!this.$v._totalTimeExercising!.$dirty) return errors
      !this.$v._totalTimeExercising!.time &&
        errors.push('活動時間はHH:mm:ssの形式で入力してください。')
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
  }
})
</script>
