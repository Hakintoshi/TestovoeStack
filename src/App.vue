<template>
  <div class="app">
    <DataTable :data="tableData" :headers="headersTable" @delete="deleteInfo"/>
    <div v-if="!tableData.length" class="app__no-data">
      Данные таблицы отсутсвуют
    </div>
  </div>
</template>

<script>
import { tableData, headersTable } from './mockTableData'
import DataTable from './components/DataTable.vue';

export default {
  name: 'App',

  components: {
    DataTable,
  },

  data() {
    return {
        tableData,
        headersTable,
    }
  },

  methods: {
    deleteInfo(idForDelete) {
      this.tableData = this.tableData.filter((el) => el.id !== idForDelete)
    }
  }
}
</script>

<style>
  .app {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }

  .app__no-data {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-weight: 700;
  }
</style>