module.exports = {
  'chainWebpack': config => {
    // https://forum.vuejs.org/t/in-cli3-how-to-get-version-from-package-json/34876/7
    config.plugin('define').tap(args => {
      let v = JSON.stringify(require('./package.json').version)
      args[0]['process.env']['VERSION'] = v
      return args
    })
  },
  'transpileDependencies': [
    'vuetify',
    'vuex-module-decorators'
  ]
}
