<template>
  <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
    <v-row>
      <v-col cols="12">
        <username-input-field :username.sync="username" />
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" :disabled="!valid" @click="onSubmit">
          更新する
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import UsernameInputField from '@/components/atom/UsernameInputField.vue'
import { LoginUser } from '~/types/auth'

type Data = {
  username: string
  valid: boolean
}

export default Vue.extend({
  props: {
    profile: {
      type: Object as PropType<LoginUser>,
      required: true
    }
  },
  data(): Data {
    return {
      username: '',
      valid: true
    }
  },
  created() {
    this.username = this.profile.username
  },
  methods: {
    onSubmit() {
      ;(this.$refs.form as any).validate()
      if (this.valid) {
        this.$emit('submit', {
          username: this.username
        })
      }
    }
  },
  components: {
    UsernameInputField
  }
})
</script>
