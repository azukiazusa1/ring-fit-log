<template>
  <div class="wrapper">
    <h1>サービス終了のお知らせ</h1>
    <p>日頃よりリングフィットログをご利用いただき誠にありがとうございます。</p>
    <p>
      突然のお知らせで大変恐縮ではありますが、2022年11月28日を持ちましてサービスの提供を終了することになりました。今まで当サービスをご愛願いただき誠にありがとうございました。
    </p>
    <p>
      サービス終了の背景といたしましては、当サービスの利用しているサーバー提供サービスである
      Heroku
      の無料プランが終了するためです。ご利用中のユーザーには大変ご迷惑をおかけいたしますが、何卒ご理解いただけますようお願い申し上げます。
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  auth: false,
  layout({ $auth }) {
    return $auth.loggedIn ? 'default' : 'unauthorized'
  },
  created() {
    this.$cookies.set('read', true)
  },
  head() {
    return {
      title: 'サービス終了のお知らせ'
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
