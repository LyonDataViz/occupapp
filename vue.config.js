const GitRevisionPlugin = require('git-revision-webpack-plugin')
const package = require('./package.json')
const gitRevisionPlugin = new GitRevisionPlugin()

const appVersion = package.version
const appVersionUrl = `https://github.com/LyonDataViz/occupapp/blob/master/VERSIONS.md#v${appVersion.replace(/\./g, '')}`
const gitRepositoryBaseUrl = package.repository.url.replace(/\.[^/.]+$/, '')
const gitVersion = gitRevisionPlugin.version()
const gitCommitHash = gitRevisionPlugin.commithash()
const gitCommitUrl = `${gitRepositoryBaseUrl}/commit/${gitCommitHash}`

module.exports = {
  'chainWebpack': config => {
    // https://forum.vuejs.org/t/in-cli3-how-to-get-version-from-package-json/34876/7
    config.plugin('define').tap(args => {
      args[0]['process.env']['INFOS_APP_VERSION'] = JSON.stringify(appVersion)
      args[0]['process.env']['INFOS_APP_VERSION_URL'] = JSON.stringify(appVersionUrl)
      args[0]['process.env']['INFOS_GIT_VERSION'] = JSON.stringify(gitVersion)
      args[0]['process.env']['INFOS_GIT_VERSION_URL'] = JSON.stringify(gitCommitUrl)
      return args
    })
  },
  'transpileDependencies': [
    'vuetify',
    'vuex-module-decorators'
  ]
}
