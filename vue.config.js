const package = require('./package.json')

const appVersion = package.version
const appVersionUrl = `https://github.com/LyonDataViz/occupapp/blob/master/VERSIONS.md#v${appVersion.replace(/\./g, '')}`
const gitRepositoryBaseUrl = package.repository.url.replace(/\.git$/, '')

let gitVersion
let gitVersionUrl
if ('NOW_GITHUB_DEPLOYMENT' in process.env) {
  // See environment variables provided by now.sh
  // https://zeit.co/docs/v2/more/now-for-github#included-environment-variables
  const org = process.env.NOW_GITHUB_COMMIT_ORG || 'LyonDataViz'
  const repo = process.env.NOW_GITHUB_COMMIT_REPO || 'occupapp'
  const gitCommitHash = process.env.NOW_GITHUB_COMMIT_SHA

  gitVersion = gitCommitHash.slice(0, 8)
  gitVersionUrl = `https://github.com/${org}/${repo}/commit/${gitCommitHash}`
} else {
  try {
    const GitRevisionPlugin = require('git-revision-webpack-plugin')
    const gitRevisionPlugin = new GitRevisionPlugin()
    const gitCommitHash = gitRevisionPlugin.commithash()

    gitVersion = gitCommitHash.slice(0, 8)
    gitVersionUrl = `${gitRepositoryBaseUrl}/commit/${gitCommitHash}`
  } catch (e) {
    // We must be in a case where
    // - the code has been exported from the git repository
    // - AND it's not being deployed on now.sh
    gitVersion = 'unknown'
    gitVersionUrl = gitRepositoryBaseUrl
  }
}

module.exports = {
  'chainWebpack': config => {
    // https://forum.vuejs.org/t/in-cli3-how-to-get-version-from-package-json/34876/7
    config.plugin('define').tap(args => {
      args[0]['process.env']['INFOS_APP_VERSION'] = JSON.stringify(appVersion)
      args[0]['process.env']['INFOS_APP_VERSION_URL'] = JSON.stringify(appVersionUrl)
      args[0]['process.env']['INFOS_GIT_VERSION'] = JSON.stringify(gitVersion)
      args[0]['process.env']['INFOS_GIT_VERSION_URL'] = JSON.stringify(gitVersionUrl)
      return args
    })
  },
  'transpileDependencies': [
    'vuetify',
    'vuex-module-decorators'
  ]
}
