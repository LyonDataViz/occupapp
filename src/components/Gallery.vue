<template>
  <v-container class="pa-0">
    <v-item-group
      v-model="selected"
      mandatory
      class="flex-columns"
    >
      <v-item
        v-for="(src,i) in srcs"
        :key="i"
        v-slot:default="{ active, toggle }"
      >
        <v-img
          :src="src"
          class="grey lighten-2 text-right pa-2"
          width="100%"
          aspect-ratio="1"
          @click="toggle"
        >
          <v-overlay
            absolute
          >
            <v-btn
              icon
              dark
              class="select-image"
            >
              <v-icon
                large
                :class="{active}"
              >
                mdi-check
              </v-icon>
            </v-btn>
          </v-overlay>
        </v-img>
      </v-item>
    </v-item-group>
  </v-container>
</template>

<style scoped>
.v-btn.select-image .v-icon {
  color: transparent
}
.v-btn.select-image .v-icon.active,
.v-image:hover .v-btn.select-image .v-icon,
.v-btn.select-image:focus-within .v-icon {
  color: currentColor
}
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import Pictures from '@/store/pictures.ts'

const pictures = getModule(Pictures)

@Component
export default class Gallery extends Vue {
  width = 320

  get srcs (): string[] {
    return pictures.srcs(this.width)
  }
  get selected (): number {
    return pictures.selected
  }
  set selected (value: number) {
    pictures.select(value)
  }
}
</script>
