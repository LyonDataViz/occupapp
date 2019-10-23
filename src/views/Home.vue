<template>
  <div
    class="home"
    ref="home"
    v-resize="onResize"
  >
    <v-responsive
      :aspect-ratio="16/9"
      :width="width/2"
      max-width="960px"
    >
      <Placeholder v-if="isResizing === false" />
      <Background v-else />
    </v-responsive>
  </div>
</template>

<script>
// @ is an alias to /src
import Background from '@/components/Background.vue'
import Placeholder from '@/components/Placeholder.vue'

export default {
  name: 'Home',
  data: () => ({
    isResizing: false,
    width: 0
  }),
  components: {
    Background,
    Placeholder
  },
  methods: {
    getWidth () {
      return this.$refs.home.clientWidth
    // },
    // onResize () {
    //   console.log('HOLA')
    //
    //   this.isResizing = true
    //   this.width = this.getWidth()
    //   setTimeout(1000, () => {
    //     console.log('OK')
    //     this.isResizing = false
    //   })
    }
  },

  mounted () {
    this.width = this.getWidth()
  }
}
</script>
