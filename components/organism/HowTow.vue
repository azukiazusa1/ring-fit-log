<template>
  <v-row>
    <v-col cols="12"></v-col>
    <h1 class="headline my-10">リングフィットログとは？</h1>
    <p class="subheading font-weight-regular">
      リングフィットログでは、リングフィットアドベンチャー運動ログ(活動時間，消費カロリー，走行距離)を記録してカレンダーやグラフで確認することができます。
    </p>

    <v-col sm="12" md="4" v-for="(item, i) in items" :key="i">
      <v-img :src="item.src" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HowTow',
  data() {
    return {
      items: [
        {
          src: '/image1.png'
        },
        {
          src: '/image2.png'
        },
        {
          src: '/image3.png'
        }
      ]
    }
  }
})
</script>
