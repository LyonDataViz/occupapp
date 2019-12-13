<template>
  <div>
    <v-subheader>
      Points
    </v-subheader>
    <v-list dense>
      <v-list-item-group
        v-model="pointsIdxSelectionArray"
        multiple
        color="indigo"
      >
        <v-list-item
          v-for="point of pointsArray"
          :key="point.id"
        >
          <v-list-item-content>
            <v-list-item-title
              v-text="`Point ${point.number} (x: ${Math.round(point.x)}, y: ${Math.round(point.y)}${getAreaString(point.id)})`"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
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

import Points, { Point } from '@/store/points.ts'
import PointsMetrics from '@/store/pointsMetrics.ts'
import PointsSelection from '@/store/pointsSelection.ts'

const points = getModule(Points)
const pointsMetrics = getModule(PointsMetrics)
const pointsSelection = getModule(PointsSelection)

@Component
export default class PointsList extends Vue {
  // computed
  get pointsArray (): Point[] {
    return points.asArray
  }
  get pointsIdxSelectionArray (): number[] {
    // v-list-item-group only allows to manage indexes of an array. We have to
    // transform the uuid to integers
    // https://vuetifyjs.com/en/components/list-item-groups
    const pointsSelectionSet = pointsSelection.asSet
    const arr: number[] = []
    // we have to loop on this.pointsArray to get the same indexes as in the
    // v-list-item element in the template
    // TODO: improve this?
    this.pointsArray.forEach((p, idx) => {
      if (pointsSelectionSet.has(p.id)) {
        arr.push(idx)
      }
    })
    return arr
  }
  set pointsIdxSelectionArray (idxArray: number[]) {
    // transform the index array back to a uuid array
    pointsSelection.fromArray(idxArray.map(idx => this.pointsArray[idx].id))
  }
  // Methods
  getAreaString (id: string): string {
    const area = pointsMetrics.getArea(id)
    return area ? `, area: ${Math.round(100 * area.area)}%` : ``
  }
}
</script>
