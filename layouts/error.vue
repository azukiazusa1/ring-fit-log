<template>
  <div class="wrapper">
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          :src="require('~/assets/image/error-cat.jpg')"
          alt="error-cat"
          contain
          max-height="500"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-2">
          <v-card-title class="text-h1 mb-5">
            {{ error.statusCode }}
          </v-card-title>
          <v-card-text>
            <p v-if="error.statusCode === 404">
              {{ pageNotFound }}
            </p>
            <p v-else>
              {{ otherError }}
            </p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="showReportDialog">
              エラーを報告する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as Sentry from '@sentry/vue'
import getLoginUser from '~/utils/getLoginUser'
export default {
  layout({ $auth }) {
    return $auth.loggedIn ? 'default' : 'unauthorized'
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound:
        'お探しのページが見つかりませんでした。移動もしくは削除された可能性があります。 また、URL、ファイル名にタイプミスがないか再度ご確認ください。',
      otherError:
        '申し訳ありません。予期せぬエラーが発生しました。エラーを報告していただけることを、心より感謝しております。',
      eventId: ''
    }
  },
  computed: {
    user() {
      if (!this.$auth.loggedIn) return null
      return this.$cookies.get('userInfo') || getLoginUser(this.$auth)
    }
  },
  created() {
    this.eventId = this.$sentry.captureException(this.error)
  },
  methods: {
    showReportDialog() {
      Sentry.showReportDialog({
        eventId: this.eventId,
        dsn: process.env.SENTRY_DSN,
        user: {
          name: this.user ? this.user.username : '',
          email: this.user ? this.user.email : ''
        }
      })
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 980px;
  margin: 0 auto;
}
</style>
