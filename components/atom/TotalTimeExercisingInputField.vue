<template>
  <date-picker
    v-model="_totalTimeExercising"
    :clearable="false"
    type="time"
    :open.sync="open"
    format="HH:mm:ss"
    value-type="HH:mm:ss"
    @change="handleChange"
  >
    <template #input>
      <v-text-field
        v-model="_totalTimeExercising"
        :error-messages="totalTimeExercisingErrors"
        prepend-icon="fas fa-stopwatch"
        clearable
        dense
        readonly
        color="orange darken-1"
        label="活動時間"
        @input="$v._totalTimeExercising.$touch()"
        @blur="$v._totalTimeExercising.$touch()"
      />
    </template>
  </date-picker>
</template>

<script lang="ts">
import Vue from 'vue'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { validationMixin } from 'vuelidate'
import { helpers } from 'vuelidate/lib/validators'
import { timeError } from '~/config/validationErrorMessages'
import { ms2stringTime, stringTime2ms } from '~/utils/msConversion'
const time = helpers.regex('time', /^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)

export default Vue.extend({
  name: 'TotalTimeExercisingInputField',
  components: {
    DatePicker
  },
  mixins: [validationMixin],
  validations: {
    _totalTimeExercising: {
      time
    }
  },
  props: {
    totalTimeExercising: {
      type: Number,
      required: false,
      default: null
    },
    validate: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    _totalTimeExercising: {
      get(): string {
        return ms2stringTime(this.totalTimeExercising)
      },
      set(totalTimeExercising: string) {
        this.$emit(
          'update:totalTimeExercising',
          stringTime2ms(totalTimeExercising)
        )
      }
    },
    totalTimeExercisingErrors(): Array<string> {
      const errors: string[] = []
      if (!this.$v._totalTimeExercising!.$dirty) return errors
      !this.$v._totalTimeExercising!.time && errors.push(timeError('活動時間'))
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
    handleChange(_v: string, type: string) {
      if (type === 'second') {
        this.open = false
      }
    }
  }
})
</script>

<style>
.mx-datepicker {
  width: 100%;
}

.mx-icon-calendar {
  display: none;
}

.popup-class {
  position: relative;
  bottom: 25px;
}
</style>
