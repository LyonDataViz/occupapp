<template>
  <div class="pa-2">
    <span class="overline">v{{ appVersion }}</span><span class="caption">. <a href="https://github.com/LyonDataViz/occupapp/blob/master/VERSIONS.md">See more</a> about versions.</span>
  </div>
</template>

<style scoped>

</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Gallery extends Vue {
  get appVersion (): string {
    return process.env.VERSION || 'undefined'
  }
}
</script>
