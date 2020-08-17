<template>
  <v-row>
    <v-col cols="1">
      <v-icon>fas fa-stopwatch</v-icon>
    </v-col>
    <v-col cols="11">
      <time-picker
        v-model="_totalTimeExercising"
        auto-scroll
        format="HH:mm:ss"
        placeholder="活動時間"
        hour-label="時"
        minute-label="分"
        second-label="秒"
        input-width="100%"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import TimePicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import { validationMixin } from 'vuelidate'
import { helpers } from 'vuelidate/lib/validators'
import { timeError } from '~/config/validationErrorMessages'
import { ms2stringTime, stringTime2ms } from '~/utils/msConversion'
const time = helpers.regex('time', /^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)

export default Vue.extend({
  name: 'TotalTimeExercisingInputField',
  components: {
    TimePicker
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
        totalTimeExercising = totalTimeExercising.replace(/HH|mm|ss/g, '00')
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
  }
})
</script>
