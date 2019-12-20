<template>
  <pre><code>{{ jsonString }}</code></pre>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getModule } from 'vuex-module-decorators'

import ExportableCompositions from '@/store/exportableCompositions.ts'

const exportableCompositions = getModule(ExportableCompositions)

@Component
export default class StoreJSON extends Vue {
  get jsonString () {
    return JSON.stringify(exportableCompositions.asArray, null, 2)
  }
}

</script>
