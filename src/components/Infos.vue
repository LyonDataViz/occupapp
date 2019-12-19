<template>
  <div class="pa-2 caption">
    <p>
      Want to give us a feedback or a suggestion? Please fill an <a
        href="https://github.com/LyonDataViz/occupapp/issues/new"
      >issue</a>.
    </p>
    <p class="credits">
      <img
        src="/liris.png"
        height
      > Developed for the <a
        href="https://projet.liris.cnrs.fr/mi2/"
      >M2i</a> project (<a
        href="https://github.com/LyonDataViz/occupapp/blob/master/VERSIONS.md"
      >v{{ appVersion }}</a>)
    </p>
  </div>
</template>

<style scoped>
.credits {
  text-align: center;
  margin: 0;
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
    return process.env.VERSION || 'undefined'
  }
}
</script>
