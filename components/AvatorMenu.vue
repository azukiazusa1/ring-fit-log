<template>
  <v-menu :offset-y="true">
    <template v-slot:activator="{ on }">
      <v-list-item-avatar v-on="on">
        <v-img :src="user.avatar_url" :alt="user.login"></v-img>
      </v-list-item-avatar>
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="user.avatar_url" :alt="user.login"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.login }}</v-list-item-title>
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
import Vue from 'vue'
export default Vue.extend({
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    logout() {
      this.$emit('logout')
    }
  }
})
</script>
