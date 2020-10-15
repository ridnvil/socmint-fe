module.exports = {
  publicPath: '',
  devServer: {
    disableHostCheck: true,
    proxy: 'https://anjay.infosec.my.id',
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
