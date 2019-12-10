<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        v-on="on"
      >
        <v-icon>mdi-image</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Background Image</span>
      </v-card-title>
      <v-card-text>
        <Gallery />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Gallery from '@/components/Gallery.vue'

@Component({
  components: {
    Gallery
  }
})
export default class GalleryButton extends Vue {
  dialog: boolean = false
}

</script>
