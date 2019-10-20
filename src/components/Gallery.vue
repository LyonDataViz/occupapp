<template>
  <v-container class="pa-0">
    <v-item-group
      v-model="selected"
      mandatory
      class="flex-columns"
    >
      <v-item
        v-for="(image,i) in images"
        :key="i"
        v-slot:default="{ active, toggle }"
      >
        <v-img
          :src="image.url"
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

export default Vue.extend({
  data: () => ({
    width: 320,
    names: [
      'petanque',
      'boats',
      'honeycomb',
      'spider',
      'wolves',
      'bazzania'
    ],
    selected: 0
  }),
  computed: {
    images: function () {
      return this.names.map(name => {
        return {
          name: name,
          url: `https://github.com/severo/pictures/raw/master/images,w_${this.width}/${name}.jpg`
        }
      })
    }
  }
})
</script>
