<template>
  <v-app id="keep">
    <v-app-bar
      app
      clipped-left
      color="amber"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <router-link
        class="title ml-3 mr-5"
        :to="{path: '/'}"
      >
        Occupapp&nbsp;<span class="font-weight-light">Voronoï</span>
      </router-link>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      class="grey lighten-4"
      app
      clipped
    >
      <v-list
        class="grey lighten-4"
        dense
      >
        <Gallery />
        <v-divider />
        <Agents />
        <v-divider />
      </v-list>
      <template v-slot:append>
        <v-divider />
        <Infos />
      </template>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

import Agents from '@/components/Agents.vue'
import Gallery from '@/components/Gallery.vue'
import Infos from '@/components/Infos.vue'

export default Vue.extend({
  name: 'App',
  data: () => ({
    drawer: true
  }),
  components: {
    Agents,
    Gallery,
    Infos
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
