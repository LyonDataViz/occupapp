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
        <canvas
          id="image-canvas"
          class="first"
          ref="imagecanvas"
          v-show="showCanvas"
          :width="canvasWidth"
          :height="canvasHeight"
          :style="canvasStyle"
        />
        <Handles
          id="absolute"
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
// Class-Style Vue Component. See
// https://vuejs.org/v2/guide/typescript.html#Basic-Usage and
// https://github.com/vuejs/vue-class-component/blob/master/example/src/App.vue
import { mapState } from 'vuex'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

import Handles from '@/components/Handles.vue'

@Component({
  components: {
    Handles
  },
  // Vuex's component binding helper can use here
  computed: mapState([
    'image'
  ])
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
  debug = false
  width = 300 // in CSS px
  height = 150 // in CSS px
  devicePixelRatio = 1
  needToRender = false

  // annotate refs type
  $refs!: {
    imagecanvas: HTMLCanvasElement,
    container: HTMLElement
  }

  // additional declaration is needed
  // when you declare some properties in `Component` decorator
  image!: number

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
  get canvas (): HTMLCanvasElement {
    return this.$refs.imagecanvas
  }
  get container (): HTMLElement {
    return this.$refs.container
  }
  get ctx (): CanvasRenderingContext2D | null {
    return this.canvas.getContext('2d')
  }
  get showPlaceholder () {
    return this.isResizing
  }
  get showCanvas () {
    return !this.isResizing
  }
  get showHandles () {
    return !this.isResizing
  }
  get name () {
    return this.names[this.image]
  }
  get maxImageWidth () {
    return this.imageWidths[this.imageWidths.length - 1]
  }
  get canvasWidth () {
    return this.width * this.devicePixelRatio
  }
  get canvasHeight () {
    return this.height * this.devicePixelRatio
  }
  get canvasStyle () {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`
    }
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
        this.drawStuff()
        this.isResizing = false
      }, 150)
    }
    requestAnimationFrame(this.checkRender)
  }
  drawStuff () {
    if (this.ctx === null) { return }
    // Redraw & reposition content
    this.ctx.setTransform(this.devicePixelRatio, 0, 0, this.devicePixelRatio, 0, 0)
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.drawImage(this.loadedImage, 0, 0, this.width, this.height)

    if (this.debug) {
      const resizeText = 'Canvas width: ' + this.canvas.width + 'px' + ' - image: ' + this.name
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = '#000'
      this.ctx.fillText(resizeText, this.width / 2, this.height / 2)
    }
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
    img.src = this.getImageFilename(this.name, this.maxImageWidth)
    img.srcset = this.imageWidths.map(w => `${this.getImageFilename(this.name, w)} ${w}w`).join(',')
  }
  @Watch('name')
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
