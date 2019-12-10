<template>
  <div>
    <v-subheader>
      Points
    </v-subheader>
    <v-list dense>
      <v-list-item
        v-for="(point, i) in points"
        :key="i"
      >
        <v-list-item-action>
          <v-checkbox
            v-model="point.selected"
          />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title
            v-text="`Agent ${i}`"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped>
.v-subheader {
  text-transform: uppercase;
}
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import { Prop, Watch } from 'vue-property-decorator'

import Compositions, { Point, Composition } from '@/store/compositions.ts'

const compositions = getModule(Compositions)

@Component
export default class PointsList extends Vue {
  // computed
  get points (): Point[] {
    return compositions.current.points
  }
}
</script>
