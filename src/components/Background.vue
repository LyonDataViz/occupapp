<template>
  <canvas
    ref="imagecanvas"
    :width="canvasWidth"
    :height="canvasHeight"
    :style="canvasStyle"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class Handles extends Vue {
  // props
  @Prop({ default: 300 }) readonly width!: number
  @Prop({ default: 150 }) readonly height!: number
  @Prop({ default: 1 }) readonly devicePixelRatio!: number

  // local data
  debug = false

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

  // methods
  drawStuff (image: HTMLImageElement, imageName: string): void {
    if (this.ctx === null) { return }
    // Redraw & reposition content
    this.ctx.setTransform(this.devicePixelRatio, 0, 0, this.devicePixelRatio, 0, 0)
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.drawImage(image, 0, 0, this.width, this.height)

    if (this.debug) {
      const resizeText = 'Canvas width: ' + this.canvas.width + 'px' + ' - image: ' + imageName
      this.ctx.textAlign = 'center'
      this.ctx.fillStyle = '#000'
      this.ctx.fillText(resizeText, this.width / 2, this.height / 2)
    }
  }
}
</script>
