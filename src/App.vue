<template>
  <v-app id="keep">
    <v-app-bar
      app
      clipped-left
      color="amber"
    >
      <router-link
        class="title ml-3 mr-5"
        :to="{path: '/'}"
      >
        Occupapp&nbsp;<span class="font-weight-light">Voronoï</span>
      </router-link>
    </v-app-bar>

    <v-navigation-drawer
      app
      clipped
      permanent
      mini-variant
    >
      <Gallery />
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Gallery from '@/components/Gallery.vue'

export default Vue.extend({
  name: 'App',
  data: () => ({
  }),
  components: {
    Gallery
  }
})
</script>

<style lang="sass">
  @import '../node_modules/typeface-roboto/index.css'
  #keep .v-app-bar .title
    color: inherit
    text-decoration: none
</style>
