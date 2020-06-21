<template>
  <v-app>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        v-for="(item, key) in items"
        :key="key"
        :to="item.to"
        class="d-none d-md-flex"
        text
      >
        <v-icon small>{{ item.icon }}</v-icon>
        <span>{{ item.title }}</span>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation class="d-md-none">
      <v-btn v-for="(item, key) in items" :key="key" :to="item.to">
        <span>{{ item.title }}</span>
        <v-icon small>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export type Item = {
  icon: String
  title: String
  to: String
}

export type DataType = {
  items: Array<Item>
  title: String
}

export default Vue.extend({
  data(): DataType {
    return {
      items: [
        {
          icon: 'fas fa-pen',
          title: '記録する',
          to: '/chart'
        },
        {
          icon: 'fa fa-chart-line',
          title: 'グラフ',
          to: '/chart'
        }
      ],
      title: 'Vuetify.js'
    }
  }
})
</script>
