<template>
  <div class="app">
    <AppTop
      class="app__app-top"
      @search="searchByName"
      @open="openModal"
    />
    <DataTable :data="currentTableData" :headers="headersTable" @delete="deleteInfo"/>
    <div v-if="!currentTableData.length" class="app__no-data">
      Данные таблицы отсутсвуют
    </div>
    <AppModal v-if="showModal" @close="closeModal">
      <AppForm 
        @closeModal="closeModal"
        @addRow="createRecord"
      />
    </AppModal>
  </div>
</template>

<script>
import { tableData, headersTable } from './mockTableData';
import { debounce } from './utils/debounce.js';
import DataTable from './components/DataTable.vue';
import AppTop from './components/AppTop.vue';
import AppModal from './components/AppModal.vue';
import AppForm from './components/AppForm.vue';

export default {
  name: 'App',

  components: {
    DataTable,
    AppTop,
    AppModal,
    AppForm,
  },

  data() {
    return {
        tableData,
        headersTable,
        searchedRows: null,
        showModal: false,
      }
  },

  computed: {
    currentTableData() {
      return this.searchedRows ? this.searchedRows : this.tableData;
    }
  },

  methods: {
    deleteInfo(idForDelete) {
      this.tableData = this.tableData.filter((el) => el.id !== idForDelete)
    },

    searchByName: debounce(function (searchText) {
      this.searchedRows = this.tableData.filter((el) => {
        return el.info.directorName.toLowerCase().includes(searchText.toLowerCase())
      });
    }, 300),

    closeModal() {
      this.showModal = false;
    },

    openModal() {
      this.showModal = true;
    },

    createRecord(formData) {
      const info = {
        company: null,
        directorName: null,
        phoneNumber: null,
      };

      for(let key in formData) {
        info[key] = formData[key].value;
      }

      console.log(info)

      this.tableData.push({
        id: this.tableData.length + 1,
        info,
      })

      this.showModal = false;
    }
  }
}
</script>

<style>
  .app {
    margin: 20px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }

  .app__app-top {
    margin-bottom: 30px;
  }

  .app__no-data {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    font-size: 30px;
    font-weight: 700;
  }
</style>