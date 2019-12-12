<template>
  <g
    ref="g"
    class="point"
    :transform="transform"
  >
    <path
      :d="d"
    />
    <circle
      class="select"
      fill="transparent"
      cx="0"
      cy="0"
      :r="radius"
      :stroke-dasharray="strokeDashArray"
      :stroke-dashoffset="strokeDashOffset"
    />
    <path
      class="icon"
      v-show="selected"
      :d="icon"
      :transform="iconTransform"
    />
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import * as d3 from 'd3'
import { mdiCheck } from '@mdi/js'

@Component
export default class PointHandle extends Vue {
  // props
  @Prop({ default: 0 }) readonly x!: number
  @Prop({ default: 0 }) readonly y!: number
  @Prop({ default: 300 }) readonly width!: number
  @Prop({ default: 150 }) readonly height!: number
  @Prop({ default: false }) readonly selected!: boolean
  @Prop({ default: false }) readonly selecting!: boolean

  // local data
  radius = 15
  selectionProgress = 0
  selectionInterval = 0
  selectionStartTimeout = 0

  // annotate refs type
  $refs!: {
    g: SVGGElement,
  }

  // computed
  get mdiIconSize () {
    return 24
  }
  get icon () {
    return mdiCheck
  }
  get iconTransform () {
    return `translate(${-this.mdiIconSize / 2},${-this.mdiIconSize / 2})`
  }
  get g () {
    return d3.select<SVGGElement, unknown>(this.$refs.g)
  }
  get symbolSize (): number {
    return this.radius * this.radius * 4
  }
  get circumference (): number {
    return 2 * Math.PI * this.radius
  }
  get strokeDashArray (): number {
    return Math.round(this.circumference * 1000) / 1000
  }
  get strokeDashOffset (): string {
    return ((100 - this.selectionProgress) / 100) * this.circumference + 'px'
  }
  get xScale () {
    return d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.width])
  }
  get yScale () {
    return d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.height])
  }
  get xAtScale (): number {
    return this.xScale(this.x)
  }
  get yAtScale (): number {
    return this.yScale(this.y)
  }
  get transform (): string {
    return `translate(${this.xAtScale}, ${this.yAtScale})`
  }
  get d (): string {
    return d3
      .symbol()
      .type(d3.symbolCircle)
      .size(this.symbolSize)() || ''
  }
  get drag () {
    return d3
      .drag<SVGGElement, unknown>()
      .on('start', this.dragStarted)
      .on('drag', this.dragged)
      .on('end', this.dragEnded)
  }

  // lifecycle hook
  mounted () {
    this.drag(this.g)
  }

  // methods
  dragStarted () {
    if (this.selecting) {
      this.toggleSelected()
    } else {
      this.g.classed('dragged', true)
      this.initSelecting()
    }
  }
  dragged () {
    if (!this.selecting) {
      this.cancelSelecting()
      this.$emit('updatexy', { x: this.x + this.xScale.invert(d3.event.dx), y: this.y + this.yScale.invert(d3.event.dy) })
      this.initSelecting()
    }
  }
  dragEnded () {
    if (!this.selecting) {
      this.cancelSelecting()
      this.g.classed('dragged', false)
    }
  }
  initSelecting () {
    this.cancelSelecting()
    this.selectionStartTimeout = window.setTimeout(() => {
      this.runSelecting()
    }, 500)
  }
  runSelecting () {
    this.selectionInterval = window.setInterval(() => {
      if (this.selectionProgress < 100) {
        this.selectionProgress += 2
      } else {
        this.commitSelected()
      }
    }, 10)
  }
  cancelSelecting () {
    clearInterval(this.selectionInterval)
    clearTimeout(this.selectionStartTimeout)
    this.selectionProgress = 0
  }
  commitSelected () {
    this.cancelSelecting()
    this.$emit('select')
  }
  toggleSelected () {
    this.$emit('toggle')
  }
}
</script>

<style lang="sass">
.point
  fill: white
  opacity: 0.7
  cursor: pointer
  stroke: black
  &:hover
    opacity: 0.9
    filter: url(#elevation2)
  &.dragged
    opacity: 0.9
    stroke-opacity: 0.5
    filter: url(#elevation8)

  .select
    stroke-width: 5
    stroke: black
  .icon
    stroke: none
    fill: var(--v-primary-base)
</style>
