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
import { Delaunay } from 'd3-delaunay'
import * as d3 from 'd3'

import * as pictures from '@/utils/pictures.ts'
import Compositions, { Point } from '@/store/compositions.ts'
import Settings from '@/store/settings.ts'

const compositions = getModule(Compositions)
const settings = getModule(Settings)

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
    return { ...this.canvasStyle }
  }
  get pictureId (): number {
    return compositions.currentPictureId
  }
  get points (): Point[] {
    return compositions.current.points
  }
  // TODO check if there is a best practice for use of 'private' keyword,a nd if we follow it
  private get isPlaceholderVisible (): boolean {
    return this.isImageLoading
  }
  private get isCanvasVisible (): boolean {
    return !this.isPlaceholderVisible
  }
  get x () {
    return d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.width])
  }
  get y () {
    return d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.height])
  }
  get voronoi () {
    return Delaunay.from(
      this.points,
      (d: Point): number => this.x(d.x),
      (d: Point): number => this.y(d.y)
    ).voronoi([0, 0, this.canvasWidth, this.canvasHeight])
  }
  get color () {
    const colors =
      [d3.rgb(255, 195, 8), d3.rgb(172, 159, 253), d3.rgb(181, 246, 66), d3.rgb(239, 106, 222)]

    // Note .hex() will be obsolete in d3-color, see https://github.com/d3/d3-color#color_formatHex and https://www.npmjs.com/package/@types/d3
    return (i: number): string => colors[i % 4].hex()
  }
  get isColored (): boolean {
    return settings.showImageColors
  }
  // lifecycle hook
  mounted () {
    this.fetchImage(this.pictureId)
  }

  // methods
  drawCanvas (): void {
    if (this.ctx === null) { return }
    // Redraw & reposition content
    this.ctx.setTransform(this.devicePixelRatio, 0, 0, this.devicePixelRatio, 0, 0)
    this.ctx.clearRect(0, 0, this.width, this.height)
    // Note: if image "srcset" is set (responsive image), the most adequate image size is used here
    // TODO confirm above comment
    if (this.isColored) {
      this.ctx.drawImage(this.image, 0, 0, this.width, this.height)
    } else {
      this.ctx.filter = 'grayscale(100%)'
      this.ctx.drawImage(this.image, 0, 0, this.width, this.height)
      this.ctx.filter = 'grayscale(0%)'
    }
    this.drawVoronoi(this.ctx)
    if (this.debug) {
      const resizeText = 'Canvas width: ' + this.canvas.width + 'px' + ' - image: ' + pictures.getName(this.pictureId)
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = '#000'
      this.ctx.fillText(resizeText, this.width / 2, this.height / 2)
    }
  }

  drawVoronoi (context: CanvasRenderingContext2D): void {
    context.save()
    const v = this.voronoi
    let i = 0
    for (const d of this.points) {
      context.beginPath()
      v.renderCell(i++, context)
      context.globalAlpha = 0.2
      context.fillStyle = this.color(i)
      context.fill()

      context.globalAlpha = 1
      context.lineWidth = 1
      context.strokeStyle = '#fff'
      context.stroke()
    }
    context.restore()
  }

  async fetchImage (pictureId: number) {
    this.isImageLoading = true
    this.image = await pictures.fetchImage(pictureId)
    this.isImageLoading = false
  }

  // watchers
  @Watch('pictureId')
  onPictureIdChange (pictureId: number, oldPictureId: number) {
    this.fetchImage(pictureId)
  }

  @Watch('image')
  @Watch('width')
  @Watch('height')
  @Watch('devicePixelRatio')
  @Watch('points', { deep: true })
  @Watch('isColored')
  onSomethingChange (val: number | HTMLImageElement, oldVal: number | HTMLImageElement) {
    // See https://stackoverflow.com/a/37588776/7351594
    this.isCanvasRendering = true
    clearTimeout(this.debounceTimer)
    this.debounceTimer = window.setTimeout(() => {
      // Note how we use an arrow function to get access to the "this" object
      // See https://stackoverflow.com/a/38737108/7351594

      if (!this.isImageLoading) {
        // Always change the size before rendering (because size change cleans the canvas)
        this.canvas.width = this.canvasWidth
        this.canvas.height = this.canvasHeight
        this.drawCanvas()
        this.isCanvasRendering = false
      }
    }, 10)
  }
}
</script>
