<template>
  <v-dialog :value="value" width="500" persistent>
    <v-card>
      <v-card-title class="text-h5">
        タイムラインへようこそ！
      </v-card-title>

      <v-card-text>
        <p class="mb-0">
          タイムラインでは、他のユーザーと運動記録を共有することができます。
        </p>
        <p class="mb-0">
          タイムラインの利用に同意した場合、運動記録を入力することでタイムラインに投稿されます。
        </p>
        <p>※タイムラインの投稿には下記アバターとユーザー名が使用されます。</p>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
          <v-row>
            <v-col cols="12" sm="2">
              <v-avatar size="62">
                <v-img :src="user.photoURL" />
              </v-avatar>
            </v-col>
            <v-col cols="12" sm="10">
              <username-input-field :username.sync="username" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          同意しない
        </v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">
          同意する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import UsernameInputField from '@/components/atom/UsernameInputField.vue'
import getLoginUser from '~/utils/getLoginUser'
import { LoginUser } from '~/types/auth'

type Data = {
  username: string
  valid: boolean
}

export default Vue.extend({
  components: {
    UsernameInputField
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data(): Data {
    return {
      username: '',
      valid: true
    }
  },
  computed: {
    user(): LoginUser {
      return getLoginUser(this.$auth) || this.$cookies.get('userInfo')
    }
  },
  created() {
    this.username = this.user.username
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
  }
})
</script>
