<template>
  <div class="pa-2 caption">
    <p>
      Want to give us a feedback or a suggestion? Please fill an <a
        href="https://github.com/LyonDataViz/occupapp/issues/new"
      >issue</a>.
    </p>
    <p class="credits ma-0">
      <img
        src="/liris.png"
        height
      > Developed for the <a
        href="https://projet.liris.cnrs.fr/mi2/"
      >M2i</a> project (version: <a
        :href="appVersionUrl"
      >{{ appVersion }}</a>, commit: <a
        :href="gitUrl"
      >{{ gitVersion }}</a>)
    </p>
  </div>
</template>

<style scoped>
p {
  text-align: center;
}
img {
  vertical-align: middle;
  height: 1rem;
  width: 1rem;
}
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Infos extends Vue {
  get appVersion (): string {
    return process.env.INFOS_APP_VERSION || '???'
  }
  get appVersionUrl (): string {
    return process.env.INFOS_APP_VERSION_URL || '???'
  }
  get gitVersion (): string {
    return process.env.INFOS_GIT_VERSION || '???'
  }
  get gitUrl (): string {
    return process.env.INFOS_GIT_VERSION_URL || '???'
  }
}
</script>
