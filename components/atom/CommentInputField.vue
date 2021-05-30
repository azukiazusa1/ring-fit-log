<template>
  <v-textarea
    v-model="_comment"
    prepend-icon="fas fa-comment"
    label="ヒトコト"
    rows="2"
    outlined
    dense
    color="orange darken-1"
    counter="140"
    :error-messages="commentErrors"
    @input="$v._comment.$touch()"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { maxLength } from 'vuelidate/lib/validators'
import { maxLengthError } from '~/config/validationErrorMessages'

export default Vue.extend({
  name: 'TotalDistanceRunInputField',
  mixins: [validationMixin],
  validations: {
    _comment: {
      maxLength: maxLength(140)
    }
  },
  props: {
    comment: {
      type: String,
      required: false,
      default: ''
    },
    validate: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      maxLength: 140
    }
  },
  computed: {
    _comment: {
      get(): string {
        return this.comment
      },
      set(comment: string | null) {
        this.$emit('update:comment', comment)
      }
    },
    commentErrors(): Array<string> {
      const errors: string[] = []
      if (!this.$v._comment!.$dirty) return errors
      !this.$v._comment!.maxLength &&
        errors.push(maxLengthError('ヒトコト', 140))
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
