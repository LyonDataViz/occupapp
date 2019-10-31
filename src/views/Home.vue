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
          ref="imagecanvas"
          v-show="showCanvas"
          :width="canvasWidth"
          :height="canvasHeight"
          :style="canvasStyle"
        />
        <svg
          id="image-svg"
          ref="imagesvg"
          v-show="showSvg"
          :viewBox="viewbox"
          :style="svgStyle"
        ><circle
          :cx="cx"
          :cy="cy"
          r="10"
        />
        </svg>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data: function () {
    return {
      debounceTimer: 0,
      isResizing: false,
      imageWidths: [320, 640, 768, 1024, 1366, 1600, 1920],
      names: [
        'petanque',
        'boats',
        'honeycomb',
        'spider',
        'wolves',
        'bazzania'
      ],
      loadedImage: new Image(),
      debug: false,
      width: 300, // in CSS px
      height: 150, // in CSS px
      devicePixelRatio: 1
    }
  },
  computed: {
    aspectRatio: function () {
      return (this.loadedImage.naturalHeight) ? this.loadedImage.naturalWidth / this.loadedImage.naturalHeight : 1
    },
    canvas: function () {
      return this.$refs.imagecanvas
    },
    ctx: function () {
      return this.canvas.getContext('2d')
    },
    svg: function () {
      return this.$refs.imagesvg
    },
    container: function () {
      return this.$refs.container
    },
    showPlaceholder: function () {
      return this.isResizing
    },
    showCanvas: function () {
      return !this.isResizing
    },
    showSvg: function () {
      return !this.isResizing
    },
    name: function () {
      return this.names[this.image]
    },
    maxImageWidth: function () {
      return this.imageWidths[this.imageWidths.length - 1]
    },
    canvasWidth: function () {
      return this.width * this.devicePixelRatio
    },
    canvasHeight: function () {
      return this.height * this.devicePixelRatio
    },
    canvasStyle: function () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    },
    viewbox: function () {
      return `0 0 ${this.width} ${this.height}`
    },
    svgStyle: function () {
      return this.canvasStyle
    },
    cx: function () {
      return this.width / 2
    },
    cy: function () {
      return this.height / 2
    },
    ...mapState(['image'])
  },
  methods: {
    dprChanged: function () {
      if (this.devicePixelRatio !== window.devicePixelRatio) {
        this.devicePixelRatio = window.devicePixelRatio
        return true
      }
      return false
    },
    resize: function () {
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
    },
    checkRender: function () {
      // Note: we could check the devicePixelRatio value (dprChanged) at a lower rate if it affects the performance
      if (this.resize() || this.dprChanged() || this.needToRender) {
        this.needToRender = false

        this.isResizing = true
        // See https://stackoverflow.com/a/37588776/7351594
        clearTimeout(this.debounceTimer)
        this.debounceTimer = setTimeout(function () {
          this.drawStuff()
          this.isResizing = false
        }.bind(this), 150)
      }
      requestAnimationFrame(this.checkRender)
    },
    drawStuff: function () {
      // Redraw & reposition content
      this.ctx.scale(this.devicePixelRatio, this.devicePixelRatio)
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.ctx.drawImage(this.loadedImage, 0, 0, this.width, this.height)

      if (this.debug) {
        const resizeText = 'Canvas width: ' + this.canvas.width + 'px' + ' - image: ' + this.name
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = '#000'
        this.ctx.fillText(resizeText, this.width / 2, this.height / 2)
      }
    },
    getImageFilename: function (name, w) {
      return `https://github.com/severo/pictures/raw/master/images,w_${w}/${name}.jpg`
    },
    updateFromLoadedImage: function (img) {
      this.loadedImage = img
      this.needToRender = true
    },
    createImage: function () {
      const img = new Image()
      img.onload = () => this.updateFromLoadedImage(img)
      img.src = this.getImageFilename(this.name, this.maxImageWidth)
      img.srcset = this.imageWidths.map(w => `${this.getImageFilename(this.name, w)} ${w}w`).join(',')
    }
  },
  mounted: function () {
    this.devicePixelRatio = window.devicePixelRatio
    this.createImage()
    this.checkRender()
  },
  watch: {
    name: function (val, oldVal) {
      this.createImage()
    }
  }
}
</script>

<style lang="sass">
  div#image-wrapper
    position: relative
  svg#image-svg
    position: absolute
    top: 0
    left: 0
    z-index: 2
</style>
