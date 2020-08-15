require('dotenv').config()
const {
  GITHUB_CLIENT,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT,
  FACEBOOK_CLIENT
} = process.env

const brands = {
  github: '#211F1F',
  facebook: '#3B5998',
  twitter: '#1DA1F2',
  qiita: '#4cb10d',
  google: '#db4a39'
}

const config = {
  serverMiddleware: ['~/api/index.ts'],

  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    titleTemplate: '%s - ' + 'リングフィットログ',
    title: 'リングフィットログ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'リングフィットログでは、リングフィットアドベンチャー運動ログ(活動時間，消費カロリー，走行距離)を記録してカレンダーやグラフで確認することができます。'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  // pwa
  manifest: {
    name: 'リングフィットログ',
    lang: 'ja',
    short_name: 'RFLog',
    title: 'リングフィットログ',
    'og:title': 'リングフィットログ',
    description:
      'リングフィットログでは、リングフィットアドベンチャー運動ログ(活動時間，消費カロリー，走行距離)を記録してカレンダーやグラフで確認することができます。',
    'og:description':
      'リングフィットログでは、リングフィットアドベンチャー運動ログ(活動時間，消費カロリー，走行距離)を記録してカレンダーやグラフで確認することができます。',
    theme_color: '#ffffff',
    background_color: '#ffffff'
  },
  workbox: {
    dev: process.env.NODE_ENV === 'development'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/axios-accessor',
    '@/plugins/vuelidate',
    { src: '@/plugins/darkTheme', mode: 'client' },
    { src: '@/plugins/localStorage', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    ['@nuxtjs/moment', { locals: ['ja'] }]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    '@nuxtjs/vuetify',
    'cookie-universal-nuxt'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    https: !!process.env.HTTPS || process.env.NODE_ENV === 'production'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: { icons: 'fa' },
    theme: {
      themes: {
        light: {
          ...brands,
          main: '#ff8200',
          secondary: '#fb0'
        },
        dark: {
          ...brands,
          main: '#ff8200',
          secondary: '#fb0'
        }
      }
    }
  },
  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/login',
      home: '/record'
    },
    strategies: {
      github: {
        client_id: GITHUB_CLIENT,
        client_secret: GITHUB_CLIENT_SECRET
      },
      google: {
        client_id: GOOGLE_CLIENT
      },
      facebook: {
        client_id: FACEBOOK_CLIENT,
        userinfo_endpoint:
          'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday']
      }
    },
    vuex: false
  },
  router: {
    middleware: ['auth', 'uid']
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
  }
}

module.exports = config
