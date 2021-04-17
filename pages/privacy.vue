<template>
  <div>
    <h1>プライバシーポリシー</h1>
    <div>
      <ul>
        <li>
          当サイトでは、一部のコンテンツについてCookie（クッキー）を利用しています。
        </li>
        <li>
          Cookieとは、サイトにアクセスした際にブラウザに保存される情報ですが、お名前やメールアドレス等の個人情報は含まれません。
        </li>
        <li>
          ブラウザの設定により、Cookieを使用しないようにすることも可能です。
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  auth: false,
  layout({ $auth }) {
    return $auth.loggedIn ? 'default' : 'unauthorized'
  },
  head() {
    return {
      title: 'プライバシーポリシー'
    }
  }
})
</script>
