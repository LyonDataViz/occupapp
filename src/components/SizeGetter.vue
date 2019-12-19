<template>
  <div class="size-getter">
    <slot
      :width="width"
      :height="height"
      :devicePixelRatio="devicePixelRatio"
    />
  </div>
</template>

<script lang="ts">
/*
 * It's an alternative to https://github.com/David-Desmaisons/Vue.resize
 * and https://github.com/Akryum/vue-resize, based on a loop as recommended
 * in https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
 *
 * Pros: it doesn't need to rely on events, and we then can check things like
 *       changes in devicePixelRatio value, for example. All props are optional.
 * Cons: maybe it's slower? Note that it might depend on my implementation (see
 *       TODOs below)
 */

import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class SizeGetter extends Vue {
  // props
  // TODO: maybe passing a function is suboptimal, and we should pass a HTMLElement on which to poll the .clientWidth property
  @Prop({ default: undefined }) readonly widthGetter!: (() => number) | undefined
  @Prop({ default: undefined }) readonly heightGetter!: (() => number) | undefined
  // TODO: add debounce prop?

  // local data
  width = 300
  height = 150
  devicePixelRatio = 1

  // lifecycle hook
  mounted () {
    // Launch the size check loop
    this.checkLoop()
  }

  get checkWidth (): () => void {
    // Computed property: will update if widthGetter prop has changed
    const wg = this.widthGetter
    if (wg === undefined) {
      return () => {}
    } else {
      return () => {
        const w = wg()
        if (w !== this.width) {
          this.width = w
        }
      }
    }
  }
  get checkHeight () {
    // Computed property: will update if heightGetter prop has changed
    const hg = this.heightGetter
    if (hg === undefined) {
      return () => {}
    } else {
      return () => {
        const h = hg()
        if (h !== this.height) {
          this.height = h
        }
      }
    }
  }
  // Methods
  checkDpr () {
    if (this.devicePixelRatio !== window.devicePixelRatio) {
      this.devicePixelRatio = window.devicePixelRatio
    }
  }
  checkLoop () {
    // Beware: this loop is called at every animation frame. Don't overload it
    // Adapted from https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
    this.checkWidth()
    this.checkHeight()
    // Note: we might check the devicePixelRatio value (checkDpr) at a lower rate if it affects the performance
    this.checkDpr()
    requestAnimationFrame(this.checkLoop)
  }
}
</script>

<style lang="sass">
</style>
