require('dotenv').config()
const {
  GITHUB_CLIENT,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT,
  FACEBOOK_CLIENT
} = process.env

const colors = require('vuetify/es5/util/colors').default

const brands = {
  github: '#211F1F',
  facebook: '#3B5998',
  twitter: '#1DA1F2',
  qiita: '#4cb10d',
  google: '#db4a39'
}

const config = {
  serverMiddleware: ['~/api'],

  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
    https: !!process.env.HTTPS
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
          github: '#fff',
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
