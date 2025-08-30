<template>
  <div class="app">
    <DataTable :data="tableData"/>
  </div>
</template>

<script>
import { tableData } from './tableData'
import DataTable from './components/DataTable.vue';

export default {
  name: 'App',

  components: {
    DataTable,
  },

  data() {
    return {
        tableData,
    }
  },
}
</script>

<style>
  .app {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }
</style>