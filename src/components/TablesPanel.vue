<template>
  <v-container>
    <h2 class="title mt-4 mb-2">
      Points Table
    </h2>
    <PointsTable />

    <h2 class="title mt-4 mb-2">
      Categories Table
    </h2>
    <CategoriesTable />

    <h2 class="title mt-4 mb-2">
      State (JSON)
    </h2>
    <StoreJSON />
  </v-container>
</template>

<style scoped>

</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import CategoriesTable from '@/components/CategoriesTable.vue'
import PointsTable from '@/components/PointsTable.vue'
import StoreJSON from '@/components/StoreJSON.vue'

@Component({
  components: {
    CategoriesTable,
    PointsTable,
    StoreJSON
  }
})
export default class TablesPanel extends Vue {
}

</script>
