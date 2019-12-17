<template>
  <v-container>
    <v-item-group
      v-model="selected"
      mandatory
    >
      <v-row
        dense
        class="images-row"
      >
        <v-col
          v-for="(imageSrc,i) in imageSrcsArray"
          :key="i"
          cols="auto"
        >
          <v-item
            v-slot:default="{ active, toggle }"
          >
            <v-img
              :src="imageSrc.thumbnailSrc || imageSrc.src"
              :srcset="imageSrc.srcset"
              class="grey lighten-2 text-right pa-2"
              width="64px"
              height="64px"
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
    <v-switch
      v-model="isColored"
      label="Show image colors"
    />
  </v-container>
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
.images-row {
  max-height: 250px;
  overflow-y: auto;
}
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'
import { ImageSrc } from '@/utils/types.ts'

import BackgroundImage from '@/store/current/backgroundImage.ts'
import Composition from '@/store/current/composition.ts'
import GalleryImages from '@/store/galleryImages.ts'
import Settings from '@/store/settings.ts'

const backgroundImage = getModule(BackgroundImage)
const composition = getModule(Composition)
const galleryImages = getModule(GalleryImages)
const settings = getModule(Settings)

@Component
export default class Gallery extends Vue {
  imageSrcs: Map<string, ImageSrc> = galleryImages.asMap

  get imageSrcsArray (): ImageSrc[] {
    return [...this.imageSrcs.values()]
  }
  get srcsArray (): string[] {
    return [...this.imageSrcs.keys()]
  }
  get selected (): number {
    return this.srcsArray.indexOf(backgroundImage.src)
  }
  set selected (idx: number) {
    composition.fromSrc(this.srcsArray[idx])
  }
  get isColored (): boolean {
    return settings.showImageColors
  }
  set isColored (value: boolean) {
    settings.setShowImageColors(value)
  }
}
</script>
