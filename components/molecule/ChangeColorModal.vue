<template>
  <v-row>
    <v-btn icon right :color="color" @click.stop="openDialog">
      <v-icon>fas fa-palette</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <ColorPicker :color.sync="_color" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import ColorPicker from '~/components/atom/ColorPicker.vue'

export default Vue.extend({
  name: 'ChangeColorModal',
  components: {
    ColorPicker
  },
  props: {
    color: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    _color: {
      get(): string {
        return this.color
      },
      set(color: string) {
        this.$emit('update:color', color)
      }
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    }
  }
})
</script>
