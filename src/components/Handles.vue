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

const Props = Vue.extend({
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 150
    }
  }
})

@Component
export default class Handles extends Props {
  get viewbox (): string {
    return `0 0 ${this.width} ${this.height}`
  }
  get svgStyle () {
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
