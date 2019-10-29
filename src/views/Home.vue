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
      />
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
      debug: false
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
    container: function () {
      return this.$refs.container
    },
    showPlaceholder: function () {
      return this.isResizing
    },
    showCanvas: function () {
      return !this.isResizing
    },
    name: function () {
      return this.names[this.image]
    },
    maxImageWidth: function () {
      return this.imageWidths[this.imageWidths.length - 1]
    },
    ...mapState(['image'])
  },
  methods: {
    resize: function () {
      // Adapted from https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
      const scale = window.devicePixelRatio
      let width = this.container.clientWidth * scale
      let height = this.container.clientHeight * scale
      if (width > height * this.aspectRatio) {
        width = Math.floor(height * this.aspectRatio)
      } else {
        height = Math.floor(width / this.aspectRatio)
      }
      if (this.canvas.width !== width || this.canvas.height !== height) {
        this.canvas.width = width
        this.canvas.height = height
        this.canvas.style.width = (width / scale) + 'px'
        this.canvas.style.height = (height / scale) + 'px'
        return true
      }
      return false
    },
    checkRender: function () {
      if (this.resize() || this.needToRender) {
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
      // ctx.scale(scale, scale);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(this.loadedImage, 0, 0, this.canvas.width, this.canvas.height)

      if (this.debug) {
        const resizeText = 'Canvas width: ' + this.canvas.width + 'px' + ' - image: ' + this.name
        this.ctx.textAlign = 'center'
        this.ctx.fillStyle = '#000'
        this.ctx.fillText(resizeText, this.canvas.width / 2, this.canvas.height / 2)
      }
    },
    getImageFilename: function (name, w) {
      return `https://github.com/severo/pictures/raw/master/images,w_${w}/${name}.jpg`
    },
    test: function (img) {
      this.loadedImage = img
      this.needToRender = true
    },
    createImage: function () {
      const img = new Image()
      img.onload = () => this.test(img)
      img.src = this.getImageFilename(this.name, this.maxImageWidth)
      img.srcset = this.imageWidths.map(w => `${this.getImageFilename(this.name, w)} ${w}w`).join(',')
    }
  },
  mounted: function () {
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
</style>
