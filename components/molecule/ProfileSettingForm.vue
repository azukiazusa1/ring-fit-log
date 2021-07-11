<template>
  <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
    <v-row>
      <v-col cols="12">
        <username-input-field :username.sync="username" />
      </v-col>
      <v-col cols="12">
        <v-checkbox v-model="timeline" label="タイムラインを利用する" />
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
  timeline: boolean
  valid: boolean
}

export default Vue.extend({
  components: {
    UsernameInputField
  },
  props: {
    profile: {
      type: Object as PropType<LoginUser>,
      required: true
    }
  },
  data(): Data {
    return {
      username: '',
      timeline: false,
      valid: true
    }
  },
  created() {
    this.username = this.profile.username
    this.timeline = this.profile.timeline
  },
  methods: {
    onSubmit() {
      ;(this.$refs.form as any).validate()
      if (this.valid) {
        this.$emit('submit', {
          username: this.username,
          timeline: this.timeline
        })
      }
    }
  }
})
</script>
