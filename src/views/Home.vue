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
      class="position-relative"
    >
      <SizeGetter
        :width-getter="widthGetter"
        :height-getter="heightGetter"
        v-slot="{width, height, devicePixelRatio}"
      >
        <Main
          :width="width"
          :height="height"
          :device-pixel-ratio="devicePixelRatio"
        />
      </SizeGetter>
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
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import { mdiPlus } from '@mdi/js'

import Main from '@/components/Main.vue'
import SizeGetter from '@/components/SizeGetter.vue'

import BackgroundImage from '@/store/current/backgroundImage.ts'
import Categories from '@/store/current/categories.ts'
import Composition from '@/store/current/composition.ts'
import PointsSelection from '@/store/current/pointsSelection.ts'
import Points from '@/store/current/points.ts'

const backgroundImage = getModule(BackgroundImage)
const categories = getModule(Categories)
const composition = getModule(Composition)
const pointsSelection = getModule(PointsSelection)
const points = getModule(Points)

@Component({
  components: {
    Main,
    SizeGetter
  }
})
export default class Home extends Vue {
  // annotate refs type
  $refs!: {
    container: HTMLElement
  }

  // lifecycle hook
  mounted () {
    // Init the composition
    composition.initWithSomething()
  }

  get buttonIcon (): string {
    return mdiPlus
  }
  get widthGetter (): () => number {
    return () => this.$refs.container ? this.$refs.container.clientWidth : 300
  }
  get heightGetter (): () => number {
    return () => this.$refs.container ? this.$refs.container.clientHeight : 150
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
.position-relative
  position: relative
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
