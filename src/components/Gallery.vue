<template>
  <div>
    <v-subheader>
      Background images
    </v-subheader>
    <v-container>
      <v-item-group
        v-model="selected"
        mandatory
      >
        <v-row dense>
          <v-col
            v-for="(src,i) in srcs"
            :key="i"
          >
            <v-item
              v-slot:default="{ active, toggle }"
            >
              <v-img
                :src="src"
                class="grey lighten-2 text-right pa-2"
                width="50px"
                height="50px"
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
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </div>
</template>

<style scoped>
.v-subheader {
  text-transform: uppercase;
}
.v-overlay {
  opacity: 0
}
.v-item--active .v-overlay,
.v-overlay:hover,
.v-overlay:focus,
.v-overlay:active {
  opacity: 1;
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
