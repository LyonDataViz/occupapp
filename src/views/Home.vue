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

export default {
  name: 'Home',
  data: function () {
    return {
      needToRender: true,
      aspectRatio: 1, // for the image
      debounceTimer: 0,
      isResizing: false
    }
  },
  computed: {
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
    }
  },
  methods: {
    resize: function () {
      // Adapted from https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
      let width = this.container.clientWidth
      let height = this.container.clientHeight
      if (width > height * this.aspectRatio) {
        width = Math.floor(height * this.aspectRatio)
      } else {
        height = Math.floor(width / this.aspectRatio)
      }
      if (this.canvas.width !== width || this.canvas.height !== height) {
        this.canvas.width = width
        this.canvas.height = height
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
        }.bind(this), 200)
      }
      requestAnimationFrame(this.checkRender)
    },
    drawStuff: function () {
      // Redraw & reposition content
      const resizeText = 'Canvas width: ' + this.canvas.width + 'px'
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = '#000'
      this.ctx.fillText(resizeText, this.canvas.width / 2, this.canvas.height / 2)
    }
  },
  mounted: function () {
    this.checkRender()
  }
}
</script>

<style lang="sass">
</style>
