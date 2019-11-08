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

import Compositions from '@/store/compositions.ts'
import * as pictures from '@/utils/pictures.ts'

const compositions = getModule(Compositions)

@Component
export default class Gallery extends Vue {
  get srcs (): string[] {
    // TODO improve safety of picture identification. Currently it only depends on the idx in pictures.thumbnailSrcs array
    return pictures.thumbnailSrcs
  }
  get selected (): number {
    return compositions.currentPictureId
  }
  set selected (pictureId: number) {
    compositions.setCurrentByPictureId(pictureId)
  }
}
</script>
