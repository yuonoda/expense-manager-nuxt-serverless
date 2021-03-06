// require('dotenv').config()
const colors = require('vuetify/es5/util/colors').default

module.exports = {
  telemetry: false,
  mode: 'universal',
  dev: process.env.NODE_ENV !== 'production',
  server: {
    port:  process.env.NODE_ENV == 'production'? null: 8000,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    BROWSER_BASE_URL: process.env.BROWSER_BASE_URL
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
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
  plugins: ['~/plugins/axios', '~/plugins/filters'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [['@nuxtjs/dotenv', { filename:process.env.NODE_ENV == 'production'?'.env.production': '.env.development' }],'@nuxtjs/vuetify', '@nuxtjs/moment'],
  /*
   ** Nuxt.js modules
   */
  modules: [['@nuxtjs/dotenv', { filename:process.env.NODE_ENV == 'production'?'.env.production': '.env.development' }], '@nuxtjs/axios', '@nuxtjs/eslint-module'],
  // modules: ['@nuxtjs/axios', '@nuxtjs/eslint-module'],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
    },
  },
  moment: {
    defaultTimezone: 'Asia/Tokyo',
  },
}
