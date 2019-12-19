<template>
  <v-container>
    <Gallery />
    <v-switch
      v-model="isColored"
      label="Show image colors"
    />
  </v-container>
</template>

<style scoped>

</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import Gallery from '@/components/Gallery.vue'

import Settings from '@/store/settings.ts'

const settings = getModule(Settings)

@Component({
  components: {
    Gallery
  }
})
export default class ImagesPanel extends Vue {
  get isColored (): boolean {
    return settings.showImageColors
  }
  set isColored (value: boolean) {
    settings.setShowImageColors(value)
  }
}

</script>
