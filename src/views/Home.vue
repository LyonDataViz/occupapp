<template>
  <v-container
    fluid
    fill-height
    pa-0
    ref="container"
  >
    <v-row
      no-gutters
      justify="center"
    >
      <div id="image-wrapper">
        <Background
          ref="background"
          class="below"
          :width="width"
          :height="height"
          :device-pixel-ratio="devicePixelRatio"
        />
        <Handles
          class="above"
          :width="width"
          :height="height"
        />
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import Compositions from '@/store/compositions.ts'

import Background from '@/components/Background.vue'
import Handles from '@/components/Handles.vue'

const compositions = getModule(Compositions)

@Component({
  components: {
    Background,
    Handles
  }
})
export default class Home extends Vue {
  // initial data
  width = 300 // in CSS px
  height = 150 // in CSS px
  devicePixelRatio = 1

  // annotate refs type
  $refs!: {
    container: HTMLElement
  }

  // lifecycle hook
  mounted () {
    // TODO remove, and set a static composition, or manage this logic inside the Composition module
    const pictureId = 0
    compositions.addByPictureId(pictureId).then(c =>
      compositions.selectDefaultByPictureId(pictureId)
    )

    // Load the default selected image
    this.checkLoop()
  }

  // computed
  get aspectRatio () {
    return compositions.current !== undefined &&
      compositions.current.pictureHeight > 0
      ? compositions.current.pictureWidth / compositions.current.pictureHeight
      : 1
  }
  get container (): HTMLElement {
    return this.$refs.container
  }

  // methods
  checkDpr () {
    if (this.devicePixelRatio !== window.devicePixelRatio) {
      this.devicePixelRatio = window.devicePixelRatio
      return true
    }
    return false
  }
  checkSize () {
    // Adapted from https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
    let width = this.container.clientWidth
    let height = this.container.clientHeight
    if (width > height * this.aspectRatio) {
      width = Math.floor(height * this.aspectRatio)
    } else {
      height = Math.floor(width / this.aspectRatio)
    }
    if (this.width !== width || this.height !== height) {
      this.width = width
      this.height = height
      return true
    }
    return false
  }
  checkLoop () {
    // Beware: this loop is called at every animation frame. Don't overload it
    this.checkSize()
    // Note: we might check the devicePixelRatio value (checkDpr) at a lower rate if it affects the performance
    this.checkDpr()
    requestAnimationFrame(this.checkLoop)
  }
}
</script>

<style lang="sass">
div#image-wrapper
  position: relative
  .below
    display: block
  .above
    position: absolute
    top: 0
    left: 0
    z-index: 2
</style>
