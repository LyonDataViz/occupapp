<template>
  <v-app id="keep">
    <v-navigation-drawer
      v-model="drawer"
      app
      right
      disable-resize-watcher
      :mobile-break-point="2*barWidth"
      :width="barWidth"
    >
      <v-toolbar light>
        <v-btn
          icon
          @click="drawer=false"
        >
          <v-icon>
            mdi-exit-to-app
          </v-icon>
        </v-btn>
        <v-toolbar-title>Points</v-toolbar-title>

        <v-spacer />
        <v-btn
          icon
          @click="toggleFullscreen()"
        >
          <v-icon>mdi-fullscreen</v-icon>
        </v-btn>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
      </v-toolbar>

      <PointsList />

      <template v-slot:append>
        <v-divider />
        <Infos />
      </template>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      color="amber"
    >
      <a
        href="/"
        class="title ml-3 mr-5"
      >
        Occupapp&nbsp;<span class="font-weight-light">Voronoï</span>
      </a>
      <v-spacer />

      <GalleryButton />
      <v-app-bar-nav-icon @click="drawer = !drawer" />
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <v-fade-transition mode="out-in">
        <Home />
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

import PointsList from '@/components/PointsList.vue'
import GalleryButton from '@/components/GalleryButton.vue'
import Infos from '@/components/Infos.vue'
import Home from '@/components/Home.vue'

export default Vue.extend({
  name: 'App',
  data: () => ({
    small: 600,
    big: 6000,
    barWidth: 600,
    drawer: false
  }),
  mounted: function () {
    this.small = this.$vuetify.breakpoint.thresholds.md * 0.5
    this.barWidth = this.small
  },
  components: {
    PointsList,
    GalleryButton,
    Infos,
    Home
  },
  methods: {
    toggleFullscreen: function () {
      if (this.barWidth === this.small) {
        this.barWidth = this.big
      } else {
        this.barWidth = this.small
      }
    }
  }
})
</script>

<style lang="sass">
  @import '../node_modules/typeface-roboto/index.css'
  .v-content
    height: 100vh
  #keep .v-app-bar .title
    color: inherit
    text-decoration: none
</style>
