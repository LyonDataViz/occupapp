<template>
  <svg
    ref="svg"
    :viewBox="viewbox"
    :style="svgStyle"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import * as d3 from 'd3'

@Component
export default class Handles extends Vue {
  // props
  @Prop({ default: 300 }) readonly width!: number
  @Prop({ default: 150 }) readonly height!: number

  // local data

  // annotate refs type
  $refs!: {
    svg: SVGElement
  }

  // computed
  get svg (): SVGElement {
    return this.$refs.svg
  }
  get viewbox (): string {
    return `0 0 ${this.width} ${this.height}`
  }
  get svgStyle (): { width: string; height: string } {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`
    }
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

  // lifecycle hooks
  mounted () {
    this.addRandomPoint()
  }

  // methods
  addRandomPoint (): void {
    const x = this.x(this.random10to90())
    const y = this.y(this.random10to90())
    const symbol = d3
      .symbol()
      .type(d3.symbolCircle)
      .size(4 * 10 * 10)
    d3.select(this.svg)
      .append('path')
      .attr('transform', `translate(${x}, ${y})`)
      .style('fill', 'blue')
      .attr('d', symbol)
  }
  random10to90 (): number {
    return Math.random() * 80 + 10
  }
}
</script>
