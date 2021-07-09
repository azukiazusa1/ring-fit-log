<template>
  <div class="wrapper">
    <skelton-timeline-card v-if="loading" />
    <v-row v-else>
      <v-col
        v-for="(item, index) in timelines"
        :key="index"
        cols="12"
        :offset="item.me ? 1 : 0"
      >
        <timeline-card :item="item" class="mb-5" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TimelineCard from '~/components/molecule/TimelineCard.vue'
import SkeltonTimelineCard from '~/components/molecule/SkeltonTimelineCard.vue'
import { TimlinesStore, SnackbarModule } from '~/utils/store-accessor'
import { Timeline } from '~/types/timeline'

type Data = {
  loading: boolean
  error: boolean
}

export default Vue.extend({
  components: {
    TimelineCard,
    SkeltonTimelineCard
  },
  data(): Data {
    return {
      loading: true,
      error: false
    }
  },
  computed: {
    timelines(): Timeline[] {
      return TimlinesStore.getTimelines
    }
  },
  async created(): Promise<void> {
    try {
      await TimlinesStore.fetchTimelines()
      this.loading = false
    } catch (e) {
      this.$sentry.captureException(e)
      SnackbarModule.error({
        message: 'データの取得時にエラーが発生しました。'
      })
    }
  }
})
</script>

<style scoped>
.wrapper {
  max-width: 980px;
  margin: 0 auto;
}
</style>
