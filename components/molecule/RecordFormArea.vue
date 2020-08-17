<template>
  <v-form @submit.prevent="submit">
    <v-row>
      <v-col cols="12">
        <TotalTimeExercisingInputField
          :total-time-exercising.sync="record.totalTimeExercising"
          :has-error.sync="errors.totalTimeExercisingError"
          :validate="validate"
        ></TotalTimeExercisingInputField>
      </v-col>
      <v-col cols="12">
        <TotalCaloriesBurnedInputField
          :total-calories-burned.sync="record.totalCaloriesBurned"
          :has-error.sync="errors.totalCaloriesBurnedError"
          :validate="validate"
        ></TotalCaloriesBurnedInputField>
      </v-col>
      <v-col cols="12">
        <TotalDistanceRunInputField
          :total-distance-run.sync="record.totalDistanceRun"
          :has-error.sync="errors.totalDistanceRunError"
          :validate="validate"
        ></TotalDistanceRunInputField>
      </v-col>
      <v-col cols="12">
        <v-card class="pa-2 text-center center" rounded outlined>
          <StampIcons
            :stamps="record.stamps"
            @armsClick="armsClick"
            @stomachClick="stomachClick"
            @legsClick="legsClick"
            @yogaClick="yogaClick"
          ></StampIcons>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <DeleteButton
          v-if="deleteMode"
          :disabled="disabled"
          :loading="loading"
          @clickOK="clickOK"
        ></DeleteButton>
        <SubmitButton
          v-else
          :disabled="disabled"
          :loading="loading"
          @click="submit"
          >{{ submitButtonText }}</SubmitButton
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { cloneDeep } from 'lodash'
import TotalTimeExercisingInputField from '~/components/atom/TotalTimeExercisingInputField.vue'
import TotalDistanceRunInputField from '~/components/atom/TotalDistanceRunInputField.vue'
import TotalCaloriesBurnedInputField from '~/components/atom/totalCaloriesBurnedInputField.vue'
import SubmitButton from '~/components/atom/SubmitButton.vue'
import DeleteButton from '~/components/atom/DeleteButton.vue'
import StampIcons from '~/components/molecule/StampIcons.vue'
import { Record } from '~/types/record'

type Data = {
  record: Record
  errors: {
    totalDistanceRunError: boolean
    totalTimeExercisingError: boolean
    totalCaloriesBurnedError: boolean
  }
  validate: boolean
}

const initialData: Record = {
  _id: '',
  totalDistanceRun: null,
  totalCaloriesBurned: null,
  totalTimeExercising: null,
  date: '',
  stamps: {
    arms: false,
    stomach: false,
    legs: false,
    yoga: false
  },
  userId: ''
}

export default Vue.extend({
  name: 'RecordFormArea',
  components: {
    TotalTimeExercisingInputField,
    TotalDistanceRunInputField,
    TotalCaloriesBurnedInputField,
    SubmitButton,
    DeleteButton,
    StampIcons
  },
  props: {
    propsRecord: {
      type: Object as PropType<Record>,
      required: true
    },
    isCreateMode: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data(): Data {
    return {
      record: initialData,
      errors: {
        totalDistanceRunError: false,
        totalTimeExercisingError: false,
        totalCaloriesBurnedError: false
      },
      validate: false
    }
  },
  computed: {
    submitButtonText(): string {
      return this.isCreateMode ? '登録する' : '更新する'
    },
    hasError(): boolean {
      return Object.values(this.errors).includes(true)
    },
    emptyField(): boolean {
      const {
        totalDistanceRun,
        totalCaloriesBurned,
        totalTimeExercising,
        stamps
      } = this.record
      return (
        totalDistanceRun === null &&
        totalCaloriesBurned === null &&
        totalTimeExercising === null &&
        !Object.values(stamps).includes(true)
      )
    },
    disabled(): boolean {
      return this.hasError || (this.isCreateMode && this.emptyField)
    },
    deleteMode(): boolean {
      return !this.isCreateMode && this.emptyField
    }
  },
  watch: {
    propsRecord: {
      immediate: true,
      handler() {
        this.record = cloneDeep(this.propsRecord)
      }
    }
  },
  methods: {
    armsClick() {
      this.record.stamps.arms = !this.record.stamps.arms
    },
    stomachClick() {
      this.record.stamps.stomach = !this.record.stamps.stomach
    },
    legsClick() {
      this.record.stamps.legs = !this.record.stamps.legs
    },
    yogaClick() {
      this.record.stamps.yoga = !this.record.stamps.yoga
    },
    submit() {
      this.validate = true
      if (this.disabled) return
      if (this.isCreateMode) {
        this.$emit('onCreate', this.record)
      } else {
        this.$emit('onUpdate', this.record)
      }
    },
    clickOK() {
      this.validate = true
      if (this.disabled) return
      this.$emit('onDelete')
    }
  }
})
</script>
