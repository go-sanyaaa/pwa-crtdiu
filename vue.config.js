module.exports = {
  pwa: {
    name: 'Личный кабинет ЦРТДиЮ',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    },
    themeColor: '#FFFFFF',
    msTileColor: '#FFFFFF'
  },
  productionSourceMap: false,
  configureWebpack:{
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}