<template>
  <svg
    :viewBox="viewbox"
    :style="svgStyle"
  ><circle
    :cx="cx"
    :cy="cy"
    r="10"
  />
  </svg>
</template>

<script lang="ts">
// Class-Style Vue Component. See
// https://vuejs.org/v2/guide/typescript.html#Basic-Usage and
// https://github.com/vuejs/vue-class-component/blob/master/example/src/App.vue
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class Handles extends Vue {
  @Prop({ default: 300 }) readonly width!: number
  @Prop({ default: 150 }) readonly height!: number
  get viewbox (): string {
    return `0 0 ${this.width} ${this.height}`
  }
  get svgStyle (): {width: string, height: string} {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`
    }
  }
  get cx (): number {
    return this.width / 2
  }
  get cy (): number {
    return this.height / 2
  }
}
</script>
