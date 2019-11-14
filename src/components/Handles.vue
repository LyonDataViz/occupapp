<template>
  <svg
    :viewBox="viewbox"
    :style="svgStyle"
  >
    <defs>
      <FilterShadow2 />
      <FilterShadow8 />
    </defs>
    <g class="points">
      <PointHandle
        v-for="(point, index) of points"
        :key="index"
        v-bind.sync="point"
        :width="width"
        :height="height"
        :selecting="selecting"
      />
    </g>
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
import PointHandle from '@/components/PointHandle.vue'

import * as pictures from '@/utils/pictures.ts'
import Compositions, { Point, Composition } from '@/store/compositions.ts'

const compositions = getModule(Compositions)

@Component({
  components: {
    FilterShadow2,
    FilterShadow8,
    PointHandle
  }
})
export default class Handles extends Vue {
  // props
  @Prop({ default: 300 }) readonly width!: number
  @Prop({ default: 150 }) readonly height!: number

  // local data
  radius = 15

  // computed
  get viewbox (): string {
    return `0 0 ${this.width} ${this.height}`
  }
  get svgStyle (): { width: string; height: string } {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`
    }
  }

  get current (): Composition {
    return compositions.current
  }
  get points (): Point[] {
    return this.current.points
  }
  set points (points: Point[]) {
    compositions.setCurrentPoints(points)
  }
  get selecting (): boolean {
    return this.points.some(p => p.selected === true)
  }

  // lifecycle hook
  // mounted () {
  // }

  // methods
}
</script>
