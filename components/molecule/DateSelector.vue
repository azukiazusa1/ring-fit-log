<template>
  <v-row>
    <v-col md="2" class="d-none d-md-flex">
      <v-btn icon @click="clickAngleDoubleLeft">
        <v-icon>fas fa-angle-double-left</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="2" md="2">
      <v-btn icon @click="clickAngleLeft">
        <v-icon>fas fa-angle-left</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="8" md="4">
      <h2 class="headline text-center">
        <AppTime :date="date" :format="format"></AppTime>
      </h2>
    </v-col>
    <v-col cols="2" md="1" offset-md="1">
      <v-btn icon @click="clickAngleRight">
        <v-icon>fas fa-angle-right</v-icon>
      </v-btn>
    </v-col>
    <v-col md="1" offset-md="1" class="d-none d-md-flex">
      <v-btn icon @click="clickAngleDoubleRight">
        <v-icon>fas fa-angle-double-right</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import AppTime from '~/components/atom/AppTime.vue'

export default Vue.extend({
  name: 'DateSelector',
  components: {
    AppTime
  },
  props: {
    date: {
      type: Date,
      required: true
    },
    format: {
      type: String,
      required: false,
      default: 'YYYY/MM/DD（ddd）'
    }
  },
  methods: {
    clickAngleDoubleLeft() {
      this.$emit('clickAngleDoubleLeft')
    },
    clickAngleLeft() {
      this.$emit('clickAngleLeft')
    },
    clickAngleRight() {
      this.$emit('clickAngleRight')
    },
    clickAngleDoubleRight() {
      this.$emit('clickAngleDoubleRight')
    }
  }
})
</script>
