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
      v-for="rowData in paginatedRows"
      :key="rowData.id"
      :rowData="rowData.info"
      :id="rowData.id"
      @deleteRow="id => $emit('delete', id)"
    />
    <div v-if="totalPages > 1" class="data-table__pagination">
      <i v-if="canPrev" class="material-icons" @click="prevPage">arrow_back</i>
      <span>Страница {{ currPage }}</span>
      <i v-if="canNext" class="material-icons" @click="nextPage"
        >arrow_forward</i
      >
    </div>
  </table>
</template>

<script>
import TableHeader from './TableHeader.vue';
import TableRow from './TableRow.vue';
import AppButton from './AppButton.vue';

export default {
  name: 'DataTable',

  components: {
    TableRow,
    TableHeader,
    AppButton,
  },

  props: {
    data: {
      type: Array,
    },
    headers: {
      type: Object,
    },
    isSearching: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentFieldBySort: null,
      sortBy: 'asc',
      currPage: 1,
      quantityForDisplay: 5,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.data.length / this.quantityForDisplay);
    },

    paginatedRows() {
      const start = (this.currPage - 1) * this.quantityForDisplay;
      const end = start + this.quantityForDisplay;
      return [...this.data].slice(start, end);
    },

    canNext() {
      return this.currPage < this.totalPages;
    },

    canPrev() {
      return this.currPage > 1;
    },
  },

  methods: {
    sortTable(field, sortBy) {
      if (!this.data.length) return;

      if (this.currentFieldBySort !== field) {
        this.sortBy = 'asc';
      }

      if (sortBy === 'desc') {
        this.data.sort((a, b) => b.info[field].localeCompare(a.info[field]));
        this.sortBy = 'asc';
      } else if (sortBy === 'asc') {
        this.data.sort((a, b) => a.info[field].localeCompare(b.info[field]));
        this.sortBy = 'desc';
      }

      this.currentFieldBySort = field;
    },

    nextPage() {
      if (this.canNext) {
        this.currPage++;
      }
    },

    prevPage() {
      if (this.canPrev) {
        this.currPage--;
      }
    },
  },

  watch: {
    totalPages(newValue) {
      if (newValue === 1) {
        this.currPage = 1;
      }
    },

    paginatedRows(newValue) {
      if (newValue.length === 0) {
        this.prevPage();
      }
    },

    isSearching(newValue, oldValue) {
      if (newValue !== oldValue) this.currPage = 1;
    },
  },
};
</script>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  position: relative;
}

.data-table__pagination {
  position: absolute;
  right: 0;
  margin-top: 30px;
  font-size: 20px;
  display: flex;
  align-items: center;
  color: rgb(117, 117, 117);
  gap: 15px;
}

.material-icons {
  color: rgb(0, 0, 0);
  cursor: pointer;
}

.material-icons:hover {
  color: rgb(204, 21, 21);
}
</style>
