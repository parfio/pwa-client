import colors from 'vuetify/es5/util/colors'

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/pwa-client/',
    middleware: ['configuration']
  }
} : {
  router: {
    base: '/',
    middleware: ['configuration']
  }
}

export default {
  ...routerBase,

  mode: 'spa',

  generate: {
    dir: 'docs'
  },

  env: {
    version: process.env.npm_package_version,
    builtDate: new Date(),
    revision: process.env.COMMIT_HASH || 'development',
    mqtt: {
      topic: {
        out: process.env.MQTT_TOPIC_OUT || 'recognize/__CLIENT_ID__/__CORRELATION_ID__',
        status: process.env.MQTT_TOPIC_STATUS || 'status/__CLIENT_ID__/+'
      }
    }
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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' },
    ]
  },

  manifest: {
    "name": "parfy.io",
    "short_name": "parfy.io",
    "start_url": "/",
    "scope": ".",
    "display": "standalone",
    "orientation": "portrait-primary",
    "background_color": "#d0b48a",
    "theme_color": "#f1debd",
    "dir": "ltr",
    "lang": "de-DE"
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#d0b48a' },

  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/localStore',
    '~/plugins/webworker',
    '~/plugins/i18n',
    '~/plugins/init',
    '~/plugins/style',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
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
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      /*
      * Required for HotModuleReloading to work with web-worker
      */
      config.output.globalObject = `(typeof self !== 'undefined' ? self : this)`
    }
  }
}
