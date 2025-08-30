<template>
  <table class="data-table" @click="onClick">
    <TableRow 
      :rowData="{...tableHeaders, 'emptyField': {key: '', sortable: false}}" 
      isHeader
    />
    <TableRow v-for="rowData in data" :rowData="rowData" removable/>
  </table>
</template>

<script>
import TableRow from './TableRow.vue';

export default {
  name: 'DataTable',

  components: {
    TableRow,
  },

  props: {
    data: {
        type: Array,
    },
  },

  data() {
    return {
    }
  },

  computed: {
    tableHeaders() {
      const keysData = Object.keys(this.data[0]);
      
      return keysData.reduce((acc, key) => {
        switch (key) {
          case 'company':
            acc[key] = {key: 'Название', sortable: true};
            return acc;
          case 'directorName':
            acc[key] = {key: 'ФИО директора', sortable: true};
            return acc;
          case 'phoneNumber':
            acc[key] = {key: 'Номер телефона', sortable: false};
            return acc;
        }
      }, {})
    },
  },

  methods: {
      onClick() {
        console.log(this.tableHeaders);
      }
    },
}
</script>

<style>
.data-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
}
</style>