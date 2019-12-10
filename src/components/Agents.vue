<template>
  <div>
    <v-subheader>
      Agents
    </v-subheader>
    <v-list dense>
      <v-list-item
        v-for="(agent, i) in agents"
        :key="i"
      >
        <v-list-item-action>
          <v-checkbox
            v-model="agent.selected"
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
export default class Agents extends Vue {
  // computed
  get agents (): Point[] {
    return compositions.current.points
  }
}
</script>
