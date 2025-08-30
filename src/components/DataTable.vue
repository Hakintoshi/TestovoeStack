<template>
  <table class="data-table">
    <TableHeader 
      :headers="headers" 
      :fieldBySort="currentFieldBySort"
      :sortBy="sortBy"
      :quantityRows="data.length"
      @sortByField="sortTable"
    />
    <TableRow 
      v-for="rowData in data" 
      :key="rowData.id"
      :rowData="rowData.info" 
      :id="rowData.id"
      @deleteRow="(id) => $emit('delete', id)"
    />
  </table>
</template>

<script>
import TableHeader from './TableHeader.vue';
import TableRow from './TableRow.vue';

export default {
  name: 'DataTable',

  components: {
    TableRow,
    TableHeader,
  },

  props: {
    data: {
        type: Array,
    },
    headers: {
      type: Object,
    }
  },

  data() {
    return {
      currentFieldBySort: null,
      sortBy: 'asc',
    }
  },

  methods: {
      sortTable(field, sortBy) {

        if(!this.data.length) return;

        if(this.currentFieldBySort !== field) {
          this.sortBy = 'asc';
        }

        if(sortBy === 'desc') {
          this.data.sort((a, b) =>  b.info[field].localeCompare(a.info[field]));
          this.sortBy = 'asc';
        } else if(sortBy === 'asc') {
          this.data.sort((a, b) => a.info[field].localeCompare(b.info[field]));
          this.sortBy = 'desc';
        }
        
        this.currentFieldBySort = field;
      },
    },
}
</script>

<style>
  td {
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    font: inherit;      
    text-align: left;
    border: 2px solid rgb(117, 117, 117);
  }

  .data-table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
  }
</style>