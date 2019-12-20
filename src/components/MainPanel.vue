<template>
  <div
    class="position-relative"
  >
    <Background
      ref="background"
      class="below"
      :width="size.width"
      :height="size.height"
      :device-pixel-ratio="devicePixelRatio"
    />
    <Handles
      class="above"
      :width="size.width"
      :height="size.height"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'

import { getModule } from 'vuex-module-decorators'

import Background from '@/components/Background.vue'
import Handles from '@/components/Handles.vue'
import SizeGetter from '@/mixins/SizeGetter.ts'

import BackgroundImage from '@/store/current/backgroundImage.ts'
const backgroundImage = getModule(BackgroundImage)

@Component({
  components: {
    Background,
    Handles
  }
})
export default class MainPanel extends mixins(SizeGetter) {
  get size (): {width: number, height: number} {
    let width = this.width
    let height = this.height
    if (width > height * this.aspectRatio) {
      width = Math.floor(height * this.aspectRatio)
    } else {
      height = Math.floor(width / this.aspectRatio)
    }
    return { width, height }
  }

  // computed
  get aspectRatio () {
    return backgroundImage.aspectRatio
  }
}
</script>

<style lang="sass">
.position-relative
  position: relative
  .below
    display: block
  .above
    position: absolute
    top: 0
    left: 0
    z-index: 2
</style>
