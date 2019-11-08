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
import { Prop, Watch } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import * as d3 from 'd3'

import FilterShadow2 from '@/components/FilterShadow2.vue'
import FilterShadow8 from '@/components/FilterShadow8.vue'

import * as pictures from '@/utils/pictures.ts'
import Compositions, { Point, Composition } from '@/store/compositions.ts'

const compositions = getModule(Compositions)

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
  get current (): Composition {
    return compositions.current
  }
  get points (): Point[] {
    return this.current.points
  }
  set points (points: Point[]) {
    // TODO expose other setters for partial updates (points[i].x = 12.34, for example)
    compositions.setCurrentPoints(points)
  }

  // lifecycle hook
  mounted () {
    this.createPoints()
  }

  // methods
  removePoints (): void {
    const point = this.svg
      .selectAll('g.point')
      .remove()
  }

  createPoints (): void {
    const symbol = d3
      .symbol()
      .type(d3.symbolCircle)
      .size(this.symbolSize)

    // TODO replace join/enter by enter(), if we will not use d3 to manage the state?
    const point = this.svg
      .selectAll('g')
      .data(this.points)
      .join(enter => {
        const g = enter
          .append('g')
          .attr('transform', (d: Point, i:number) => {
            const p = this.points[i]
            return `translate(${this.x(p.x)}, ${this.y(p.y)})`
          })
          .classed('point', true)
          .on('mouseover', function () {
            d3.select(this).raise()
          }).call(
            // For an explanation on ".drag<SVGGElement, Point>()":
            // see https://stackoverflow.com/a/44523718/7351594
            d3
              .drag<SVGGElement, Point>()
              .on('start', (d: Point, i: number, nodes) => {
                d3.select(nodes[i]).classed('dragged', true)
              })
              .on('drag', (d: Point, i: number, nodes) => {
                const position = d3.mouse(this.$refs.svg)
                // Note: this.points (Vue component local store) is the state of truth
                // we don't let d3 manage the data
                const p = this.points[i]
                p.x = this.x.invert(position[0])
                p.y = this.y.invert(position[1])
                d3.select(nodes[i]).attr('transform', `translate(${this.x(p.x)}, ${this.y(p.y)})`)
              })
              .on('end', (d: Point, i: number, nodes) => {
                d3.select(nodes[i]).classed('dragged', false)
              })
          )
        g.append('path')
          .classed('symbol', true)
          .attr('d', symbol)
        return g
      })
  }
  // random10to90 (): number {
  //   return Math.random() * 80 + 10
  // }

  @Watch('current')
  onCompositionChange (val: Composition, oldVal: Composition) {
    // // TODO: ensure the points are committed to the store (compositions) now, or when a point is dragged
    // this.points = d3.range(5).map(i => ({
    //   x: this.random10to90(),
    //   y: this.random10to90()
    // }))

    this.removePoints()
    this.createPoints()
  }

  @Watch('width')
  @Watch('height')
  onResize (val: number, oldVal: number) {
    // this.x and this.y (scales) should have been modified
    this.svg
      .selectAll('.point')
      .attr('transform', (d: any, i:number) => {
        const p = this.points[i]
        return `translate(${this.x(p.x)}, ${this.y(p.y)})`
      })
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
