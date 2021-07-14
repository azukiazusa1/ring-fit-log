<template>
  <v-app-bar fixed app color="main" dark>
    <toolbar-title>{{ title }}</toolbar-title>
    <v-spacer />
    <span v-for="(item, key) in items" :key="key" class="d-none d-md-flex">
      <NavItem
        :title="item.title"
        :icon="item.icon"
        :to="item.to"
        :badge="item.badge"
        prepend-icon
        text
      />
    </span>
    <avator-menu :user="user" @logout="logout"></avator-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import ToolbarTitle from '~/components/atom/ToolbarTitle.vue'
import NavItem from '~/components/atom/NavItem.vue'
import AvatorMenu from '~/components/molecule/AvatorMenu.vue'
import { SnackbarModule } from '~/store'
import getLoginUser from '~/utils/getLoginUser'
import { Item } from '~/types/index'
import { LoginUser } from '~/types/auth'

export default Vue.extend({
  name: 'AppHeader',
  components: {
    ToolbarTitle,
    NavItem,
    AvatorMenu
  },
  props: {
    items: {
      type: Array as PropType<Item[]>,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    user(): Partial<LoginUser> {
      return this.$cookies.get('userInfo') || getLoginUser(this.$auth)
    }
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        SnackbarModule.info({
          message: 'ログアウトしました。'
        })
        this.$router.push('/')
        this.$cookies.remove('userId')
        this.$cookies.remove('userInfo')
      } catch (e) {
        this.$sentry.captureException(e)
        SnackbarModule.error({
          message: 'ログアウトに失敗しました。'
        })
      }
    }
  }
})
</script>
