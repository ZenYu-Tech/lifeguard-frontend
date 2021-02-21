export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '西灣學院｜運動與健康教育中心',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.png' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    { src: 'element-ui/lib/theme-chalk/index.css' },
    { src: 'element-ui/lib/theme-chalk/display.css' },
    { src: '@/assets/scss/main.scss' }
  ],

  styleResources: {
    scss: ['~/assets/scss/variable/*.scss'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/apis/axios',
    '@/plugins/element-ui',
    '@/plugins/detect-device.client.js',
    '@/plugins/date-formator.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
  },
  router: {
    middleware: ['banner']
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://lifeguard2020.herokuapp.com/'
  },
  privateRuntimeConfig: {}
}
