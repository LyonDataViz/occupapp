<template>
  <g
    ref="g"
    class="point"
    :transform="transform"
  >
    <path
      :d="d"
    />
  </g>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import * as d3 from 'd3'

@Component
export default class PointHandle extends Vue {
  // props
  @Prop({ default: 0 }) readonly x!: number
  @Prop({ default: 0 }) readonly y!: number
  @Prop({ default: 300 }) readonly width!: number
  @Prop({ default: 150 }) readonly height!: number

  // local data
  radius = 15

  // annotate refs type
  $refs!: {
    g: SVGGElement,
  }

  // computed
  get g () {
    return d3.select<SVGGElement, unknown>(this.$refs.g)
  }
  get symbolSize (): number {
    return this.radius * this.radius * 4
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
    this.g.classed('dragged', true)
  }
  dragged () {
    this.$emit('update:x', this.x + this.xScale.invert(d3.event.dx))
    this.$emit('update:y', this.y + this.yScale.invert(d3.event.dy))
  }
  dragEnded () {
    this.g.classed('dragged', false)
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
</style>
