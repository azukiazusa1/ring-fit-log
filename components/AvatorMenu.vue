<template>
  <v-menu :offset-y="true">
    <template v-slot:activator="{ on }">
      <v-list-item-avatar v-on="on">
        <v-img :src="user.photoURL" :alt="user.username"></v-img>
      </v-list-item-avatar>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="user.photoURL" :alt="user.username"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.username }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="logout">
        <v-list-item-title @click="logout">ログアウト</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { LoginUser } from '~/types/auth'

export default Vue.extend({
  props: {
    user: {
      type: Object as PropType<LoginUser>,
      required: true
    }
  },
  methods: {
    logout(): void {
      this.$emit('logout')
    }
  }
})
</script>
