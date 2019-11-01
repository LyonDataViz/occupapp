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
        <v-skeleton-loader
          class="mx-auto"
          min-width="300"
          type="card"
          v-show="showPlaceholder"
        />
        <Background
          ref="background"
          class="first"
          v-show="showBackground"
          :width="width"
          :height="height"
          :device-pixel-ratio="devicePixelRatio"
        />
        <Handles
          class="second"
          v-show="showHandles"
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
import { Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Pictures from '@/store/pictures.ts'

import Background from '@/components/Background.vue'
import Handles from '@/components/Handles.vue'

const pictures = getModule(Pictures)

@Component({
  components: {
    Background,
    Handles
  }
})
export default class Home extends Vue {
  // initial data
  debounceTimer: number = 0
  isResizing: boolean = false
  imageWidths = ['320', '640', '768', '1024', '1366', '1600', '1920']
  names = [
    'petanque',
    'boats',
    'honeycomb',
    'spider',
    'wolves',
    'bazzania'
  ]
  loadedImage: HTMLImageElement = new Image()
  width = 300 // in CSS px
  height = 150 // in CSS px
  devicePixelRatio = 1
  needToRender = false

  // annotate refs type
  $refs!: {
    background: Background
    container: HTMLElement
  }

  // lifecycle hook
  mounted () {
    this.devicePixelRatio = window.devicePixelRatio
    this.createImage()
    this.checkRender()
  }

  // computed
  get aspectRatio () {
    return (this.loadedImage.naturalHeight) ? this.loadedImage.naturalWidth / this.loadedImage.naturalHeight : 1
  }
  get container (): HTMLElement {
    return this.$refs.container
  }
  get showPlaceholder () {
    return this.isResizing
  }
  get showBackground () {
    return !this.isResizing
  }
  get showHandles () {
    return !this.isResizing
  }
  get imageName () {
    return this.names[pictures.selected]
  }
  get maxImageWidth () {
    return this.imageWidths[this.imageWidths.length - 1]
  }

  // methods
  dprChanged () {
    if (this.devicePixelRatio !== window.devicePixelRatio) {
      this.devicePixelRatio = window.devicePixelRatio
      return true
    }
    return false
  }
  resize () {
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
  checkRender () {
    // Note: we could check the devicePixelRatio value (dprChanged) at a lower rate if it affects the performance
    if (this.resize() || this.dprChanged() || this.needToRender) {
      this.needToRender = false

      this.isResizing = true
      // See https://stackoverflow.com/a/37588776/7351594
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        // Note how we use an arrow function to get access to the "this" object
        // See https://stackoverflow.com/a/38737108/7351594

        // TODO use Vuex or an Event Bus to reduce coupling with Background component
        // see https://stackoverflow.com/a/57421451/7351594
        (this.$refs.background as Background & { drawStuff: (image: HTMLImageElement, imageName: string) => void }).drawStuff(this.loadedImage, this.imageName)
        this.isResizing = false
      }, 150)
    }
    requestAnimationFrame(this.checkRender)
  }

  getImageFilename (name: string, w: string) {
    return `https://github.com/severo/pictures/raw/master/images,w_${w}/${name}.jpg`
  }
  updateFromLoadedImage (img: HTMLImageElement) {
    this.loadedImage = img
    this.needToRender = true
  }
  createImage () {
    this.isResizing = true
    const img = new Image()
    img.onload = () => this.updateFromLoadedImage(img)
    img.src = this.getImageFilename(this.imageName, this.maxImageWidth)
    img.srcset = this.imageWidths.map(w => `${this.getImageFilename(this.imageName, w)} ${w}w`).join(',')
  }
  @Watch('imageName')
  onNameChanged (val: string, oldVal: string) {
    this.createImage()
  }
}
</script>

<style lang="sass">
  div#image-wrapper
    position: relative
    .first
      display: block
    .second
      position: absolute
      top: 0
      left: 0
      z-index: 2
</style>
