<template>
  <div
    class="d-flex align-center ma-0"
    ref="wrapper"
    :style="wrapperStyle"
  >
    <v-skeleton-loader
      class="mx-auto"
      width="300"
      type="card"
      v-show="isPlaceholderVisible"
    />
    <canvas
      ref="imagecanvas"
      :style="canvasStyle"
      v-show="isCanvasVisible"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import { Prop, Watch } from 'vue-property-decorator'

import Pictures from '@/store/pictures.ts'

const pictures = getModule(Pictures)

@Component
export default class Handles extends Vue {
  // props
  @Prop({ default: 300 }) readonly width!: number
  @Prop({ default: 150 }) readonly height!: number
  @Prop({ default: 1 }) readonly devicePixelRatio!: number

  // local data
  debug = false
  image: HTMLImageElement = new Image()
  debounceTimer: number = 0
  isImageLoading: boolean = true
  isCanvasRendering: boolean = false

  // annotate refs type
  $refs!: {
    imagecanvas: HTMLCanvasElement,
  }

  // computed
  get canvas (): HTMLCanvasElement {
    return this.$refs.imagecanvas
  }
  get ctx (): CanvasRenderingContext2D | null {
    return this.canvas.getContext('2d')
  }
  get canvasWidth (): number {
    return this.width * this.devicePixelRatio
  }
  get canvasHeight (): number {
    return this.height * this.devicePixelRatio
  }
  get canvasStyle (): {width: string, height: string} {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`
    }
  }
  get wrapperStyle (): {width: string, height: string} {
    return this.canvasStyle
  }
  get selected (): number {
    return pictures.selected
  }
  private get isPlaceholderVisible (): boolean {
    return this.isImageLoading || this.isCanvasRendering
  }
  private get isCanvasVisible (): boolean {
    return !this.isPlaceholderVisible
  }

  // lifecycle hooks
  mounted () {
    this.createImage()
  }

  // methods
  drawCanvas (imageName: string): void {
    if (this.ctx === null) { return }
    // Redraw & reposition content
    this.ctx.setTransform(this.devicePixelRatio, 0, 0, this.devicePixelRatio, 0, 0)
    this.ctx.clearRect(0, 0, this.width, this.height)
    // Note: if image "srcset" is set (responsive image), the most adequate image size is used here
    // TODO confirm above comment
    this.ctx.drawImage(this.image, 0, 0, this.width, this.height)

    if (this.debug) {
      const resizeText = 'Canvas width: ' + this.canvas.width + 'px' + ' - image: ' + imageName
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = '#000'
      this.ctx.fillText(resizeText, this.width / 2, this.height / 2)
    }
  }

  createImage () {
    this.isImageLoading = true
    const img = new Image()
    img.onload = () => {
      this.image = img
      this.isImageLoading = false
    }
    img.src = pictures.selectedSrcAtWidth(pictures.maxWidth)
    img.srcset = pictures.widths.map(w => `${pictures.selectedSrcAtWidth(w)} ${w}w`).join(',')
  }

  // watchers
  @Watch('selected')
  onSelectedImageChange (val: string, oldVal: string) {
    this.createImage()
  }
  @Watch('image')
  @Watch('width')
  @Watch('height')
  @Watch('devicePixelRatio')
  onSomethingChange (val: string, oldVal: string) {
    // See https://stackoverflow.com/a/37588776/7351594
    this.isCanvasRendering = true
    clearTimeout(this.debounceTimer)
    this.debounceTimer = setTimeout(() => {
      // Note how we use an arrow function to get access to the "this" object
      // See https://stackoverflow.com/a/38737108/7351594

      if (!this.isImageLoading) {
        // Always change the size before rendering (because size change cleans the canvas)
        this.canvas.width = this.canvasWidth
        this.canvas.height = this.canvasHeight
        this.drawCanvas(pictures.selectedName)
        this.isCanvasRendering = false
      }
    }, 150)
  }
}
</script>
