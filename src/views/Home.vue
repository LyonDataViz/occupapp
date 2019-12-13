<template>
  <v-container
    fluid
    fill-height
    pa-0
    ref="container"
  >
    <v-row
      no-gutters
      justify="center"
    >
      <div id="image-wrapper">
        <v-banner
          class="floating"
          single-line
          elevation="8"
          transition="slide-y-transition"
          v-show="showBanner"
        >
          {{ selectedPointsText }}
          <template v-slot:actions>
            <v-btn
              text
              color="secondary"
              @click="cancelSelection"
            >
              Dismiss
            </v-btn>
            <v-btn
              text
              color="error"
              @click="deleteSelection"
            >
              Delete
            </v-btn>
          </template>
        </v-banner>

        <Background
          ref="background"
          class="below"
          :width="width"
          :height="height"
          :device-pixel-ratio="devicePixelRatio"
        />
        <Handles
          class="above"
          :width="width"
          :height="height"
        />
        <v-btn
          class="button"
          key="1"
          color="amber"
          fab
          large
          dark
          bottom
          left
          @click="addPoint"
        >
          <v-icon color="black">
            {{ buttonIcon }}
          </v-icon>
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import { mdiPlus } from '@mdi/js'

import Compositions, { Composition } from '@/store/compositions.ts'
import Categories from '@/store/categories.ts'
import PointsSelection from '@/store/pointsSelection.ts'
import Points from '@/store/points.ts'

import Background from '@/components/Background.vue'
import Handles from '@/components/Handles.vue'

const compositions = getModule(Compositions)
const categories = getModule(Categories)
const pointsSelection = getModule(PointsSelection)
const points = getModule(Points)

@Component({
  components: {
    Background,
    Handles
  }
})
export default class Home extends Vue {
  // initial data
  width = 300 // in CSS px
  height = 150 // in CSS px
  devicePixelRatio = 1

  // annotate refs type
  $refs!: {
    container: HTMLElement
  }

  // lifecycle hook
  mounted () {
    this.checkLoop()
  }

  // computed
  get aspectRatio () {
    // TODO utiliser mapGetters?
    return compositions.currentAspectRatio
  }
  get container (): HTMLElement {
    return this.$refs.container
  }
  get buttonIcon (): string {
    return mdiPlus
  }

  // methods
  checkDpr () {
    if (this.devicePixelRatio !== window.devicePixelRatio) {
      this.devicePixelRatio = window.devicePixelRatio
      return true
    }
    return false
  }
  checkSize () {
    // Adapted from https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
    let width = this.container.clientWidth
    let height = this.container.clientHeight
    if (width > height * this.aspectRatio) {
      width = Math.floor(height * this.aspectRatio)
    } else {
      height = Math.floor(width / this.aspectRatio)
    }
    if (this.width !== width || this.height !== height) {
      this.width = width
      this.height = height
      return true
    }
    return false
  }
  checkLoop () {
    // Beware: this loop is called at every animation frame. Don't overload it
    this.checkSize()
    // Note: we might check the devicePixelRatio value (checkDpr) at a lower rate if it affects the performance
    this.checkDpr()
    requestAnimationFrame(this.checkLoop)
  }

  get selectedPointsText (): string {
    return `${pointsSelection.size} ${pointsSelection.size === 1 ? 'point' : 'points'}`
  }
  get showBanner (): boolean {
    return pointsSelection.size > 0
  }

  // methods
  cancelSelection () {
    pointsSelection.clear()
  }
  deleteSelection () {
    points.deleteSet(pointsSelection.asSet)
    pointsSelection.clear()
  }
  async addPoint () {
    points.postRandom(await categories.nextId())
  }
}
</script>

<style lang="sass">
div#image-wrapper
  position: relative
  .below
    display: block
  .above
    position: absolute
    top: 0
    left: 0
    z-index: 2
  .floating
    position: absolute
    top: 20px
    left: 20px
    max-width: 90vw
    z-index: 4
  .button
    position: absolute
    bottom: 30px
    right: 30px
    z-index: 3
</style>
