<template>
  <svg
    ref="svg"
    :viewBox="viewbox"
    :style="svgStyle"
  >
    <defs>
      <FilterShadow2 />
      <FilterShadow8 />
    </defs>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import * as d3 from 'd3'

import FilterShadow2 from '@/components/FilterShadow2.vue'
import FilterShadow8 from '@/components/FilterShadow8.vue'

interface Point {
    x: number;
    y: number;
}

@Component({
  components: {
    FilterShadow2,
    FilterShadow8
  }
})
export default class Handles extends Vue {
  // props
  @Prop({ default: 300 }) readonly width!: number
  @Prop({ default: 150 }) readonly height!: number

  // local data
  radius = 15

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

    // See https://stackoverflow.com/a/44523718/7351594
    const point = this.svg
      .selectAll('g')
      .data([{ x, y }])
      .join(
        function (enter) {
          const g = enter
            .append('g')
            .attr('transform', `translate(${x}, ${y})`)
            .classed('point', true)
            .on('mouseover', function () {
              d3.select(this)
                .raise()
            })
            .call(
              d3
                .drag<SVGGElement, Point>()
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
          g
            .append('path')
            .attr('d', symbol)
          return g
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
