const package = require('./package.json')

const appVersion = package.version
const appVersionUrl = `https://github.com/LyonDataViz/occupapp/blob/master/VERSIONS.md#v${appVersion.replace(/\./g, '')}`
const gitRepositoryBaseUrl = package.repository.url.replace(/\.[^/.]+$/, '')

let gitVersion
let gitCommitHash
try {
  const GitRevisionPlugin = require('git-revision-webpack-plugin')
  const gitRevisionPlugin = new GitRevisionPlugin()
  gitVersion = gitRevisionPlugin.version()
  gitCommitHash = gitRevisionPlugin.commithash()
} catch (e) {
  // Must be a deployment made from an export of the code, without .git
  // That's what does now.sh
  // They provide environment variables (https://zeit.co/docs/v2/more/now-for-github#included-environment-variables)
  // See below how they are used.
}

const getGitCommitUrl = commitHash => `${gitRepositoryBaseUrl}/commit/${gitCommitHash}`

module.exports = {
  'chainWebpack': config => {
    // https://forum.vuejs.org/t/in-cli3-how-to-get-version-from-package-json/34876/7
    config.plugin('define').tap(args => {
      args[0]['process.env']['INFOS_APP_VERSION'] = JSON.stringify(appVersion)
      args[0]['process.env']['INFOS_APP_VERSION_URL'] = JSON.stringify(appVersionUrl)

      if (gitVersion !== undefined && gitCommitHash !== undefined) {
        args[0]['process.env']['INFOS_GIT_VERSION'] = JSON.stringify(gitVersion)
        args[0]['process.env']['INFOS_GIT_VERSION_URL'] = JSON.stringify(getGitCommitUrl(gitCommitHash))
      } else if ('NOW_GITHUB_COMMIT_SHA' in args[0]['process.env']) {
        args[0]['process.env']['INFOS_GIT_VERSION'] = JSON.stringify(args[0]['process.env']['NOW_GITHUB_COMMIT_SHA'].slice(0, 8))
        args[0]['process.env']['INFOS_GIT_VERSION_URL'] = JSON.stringify(getGitCommitUrl(args[0]['process.env']['NOW_GITHUB_COMMIT_SHA']))
      }
      return args
    })
  },
  'transpileDependencies': [
    'vuetify',
    'vuex-module-decorators'
  ]
}
