<template>
  <v-text-field
    v-model="_username"
    label="ユーザー名"
    color="orange darken-1"
    counter="50"
    :error-messages="usernameErrors"
    @input="$v._username.$touch()"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from 'vuelidate'
import { maxLength, required } from 'vuelidate/lib/validators'
import { maxLengthError, requiredError } from '~/config/validationErrorMessages'

export default Vue.extend({
  name: 'UsernameInputField',
  mixins: [validationMixin],
  validations: {
    _username: {
      required,
      maxLength: maxLength(50)
    }
  },
  props: {
    username: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    _username: {
      get(): string {
        return this.username
      },
      set(username: string | null) {
        this.$emit('update:username', username)
      }
    },
    usernameErrors(): string[] {
      const errors: string[] = []
      if (!this.$v._username!.$dirty) return errors
      !this.$v._username!.maxLength &&
        errors.push(maxLengthError('ユーザー名', 50))
      !this.$v._username!.required && errors.push(requiredError('ユーザー名'))
      return errors
    }
  }
})
</script>
