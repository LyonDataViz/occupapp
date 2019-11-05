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

interface Point {
    x: number;
    y: number;
}

@Component
export default class Handles extends Vue {
  // props
  @Prop({ default: 300 }) readonly width!: number
  @Prop({ default: 150 }) readonly height!: number

  // local data
  radius = 8

  // annotate refs type
  $refs!: {
    svg: SVGSVGElement
  }

  // computed
  get svg () {
    return d3.select(this.$refs.svg)
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
  get symbolSize (): number {
    return this.radius * this.radius * 4
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
      .size(this.symbolSize)

    const point = this.svg
      .selectAll('path')
      .data([{ x, y }])
      .join(
        function (enter) {
          return enter
            .append('path')
            .attr('transform', `translate(${x}, ${y})`)
            .attr('d', symbol)
            .classed('point', true)
            .on('mouseover', function () {
              d3.select(this)
                .raise()
            })
            .call(
              d3
                .drag<SVGPathElement, Point>()
                .on('start', function (d: Point) {
                  d3.select(this).classed('dragged', true)
                })
                .on('drag', function (d: Point) {
                  d3.select(this).attr('transform', function (d: any) : string { return `translate(${(d.x += d3.event.dx)}, ${(d.y += d3.event.dy)})` })
                })
                .on('end', function (d: Point) {
                  d3.select(this).classed('dragged', false)
                })
            )
        }
      )
  }
  random10to90 (): number {
    return Math.random() * 80 + 10
  }
}
</script>

<style lang="sass">
  .point
    fill: white
    opacity: 0.8
    cursor: pointer
    &:hover
      opacity: 1
    &.dragged
      fill: steelblue
</style>
