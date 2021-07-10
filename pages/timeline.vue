<template>
  <div class="wrapper">
    <v-row v-if="loading">
      <v-col v-for="n in 5" :key="n" cols="12">
        <skelton-timeline-card v-if="loading" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="(item, index) in timelines" :key="index" cols="12">
        <timeline-card :item="item" class="mb-2" />
      </v-col>
    </v-row>
    <timeline-agree-dialog v-model="showDialog" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TimelineCard from '~/components/molecule/TimelineCard.vue'
import TimelineAgreeDialog from '~/components/molecule/TimelineAgreeDialog.vue'
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
    TimelineAgreeDialog,
    SkeltonTimelineCard
  },
  asyncData({ app }) {
    const { $cookies } = app
    const user = $cookies.get('userInfo')
    let showDialog = false
    if (user.timeline) {
      showDialog = false
    } else {
      showDialog = true
    }

    return { showDialog }
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
  },
  head(): {
    title: string
  } {
    return {
      title: 'タイムライン'
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
