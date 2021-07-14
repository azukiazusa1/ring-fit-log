<template>
  <div class="wrapper">
    <v-row v-if="initialLoading">
      <v-col v-for="n in 5" :key="n" cols="12">
        <skelton-timeline-card />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="(item, index) in timelines" :key="index" cols="12">
        <timeline-card :item="item" class="mb-2" @toggleLike="toggleLike" />
      </v-col>
      <v-col cols="12" align="center">
        <v-progress-circular
          v-show="hasNextPage"
          v-intersect="onIntersect"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <timeline-agree-dialog
      v-model="showDialog"
      :user="user"
      @submit="onAgree"
      @cancel="onCancel"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TimelineCard from '~/components/molecule/TimelineCard.vue'
import TimelineAgreeDialog from '~/components/molecule/TimelineAgreeDialog.vue'
import SkeltonTimelineCard from '~/components/molecule/SkeltonTimelineCard.vue'
import { TimelinesStore, SnackbarModule } from '~/utils/store-accessor'
import { Timeline } from '~/types/timeline'
import getLoginUser from '~/utils/getLoginUser'
import { LoginUser } from '~/types/auth'

type Data = {
  initialLoading: boolean
  loading: boolean
  error: boolean
  showDialog: boolean
  page: number
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
      initialLoading: true,
      loading: true,
      error: false,
      showDialog: true,
      page: 1
    }
  },
  computed: {
    timelines(): Timeline[] {
      return TimelinesStore.getTimelines
    },
    hasNextPage() {
      return TimelinesStore.getPaginate?.hasNextPage
    },
    user(): Partial<LoginUser> | undefined {
      return getLoginUser(this.$auth) || this.$cookies.get('userInfo')
    }
  },
  async created(): Promise<void> {
    TimelinesStore.clear()
    await this.fetchTimeline()
    this.initialLoading = false
  },
  methods: {
    async fetchTimeline(): Promise<void> {
      this.loading = true
      try {
        await TimelinesStore.fetchTimelines({ page: this.page })
        this.loading = false
      } catch (e) {
        this.$sentry.captureException(e)
        SnackbarModule.error({
          message: 'データの取得時にエラーが発生しました。'
        })
      }
    },
    toggleLike({ id }: { id: string }) {
      TimelinesStore.toggleLike({ id })
    },
    onIntersect(entries: any) {
      if (!this.loading && entries[0].isIntersecting) {
        this.page++
        this.fetchTimeline()
      }
    },
    async onAgree({ username }: { username: string }) {
      const { data } = await this.$axios.put('/api/users', {
        username,
        photoURL: this.user?.photoURL,
        timeline: true
      })
      this.$cookies.set('userInfo', JSON.stringify(data), {
        maxAge: 60 * 60 * 24 * 365,
        path: '/'
      })
      this.showDialog = false
    },
    onCancel() {
      this.$router.push('/record')
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
  height: calc(100% - 56px);
}
</style>
