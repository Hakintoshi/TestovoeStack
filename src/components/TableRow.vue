<template>
  <tr class="table-row">
    <td
      v-if="isHeader"
      v-for="header in rowData"
      class="table-row__headers"
      :class="{'table-row__headers_sortable': header.sortable}"
    >
      {{ header.key }}
    </td>
    <td
      v-if="!isHeader"
      v-for="(value, key) in rowData"
      :key="key" 
      class="table-row__cell" 
      :class="{'table-row__cell_phoneNumber': key === 'phoneNumber'}" >
        {{ value }}
    </td>
    <td v-if="removable" class="table-row__delete-icon">
      <i class="material-icons">close</i>
    </td>
  </tr>
</template>

<script>

export default {
  name: 'TableRow',

  props: {
    rowData: {
        type: Object,
    },
    removable: {
      type: Boolean,
      default: false,
    },
    isHeader: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
    }
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

  .table-row {
     
  }

  .table-row__delete-icon {
    text-align: center;
    cursor: pointer;
  }

  .table-row__cell {
    padding: 5px 10px;
    font-size: 20px;
  }

  .table-row__headers {
    text-align: center;
    padding: 15px 10px;
    font-size: 22px;
    color: rgb(117, 117, 117);
  }

  .table-row__headers_sortable {
    cursor: pointer;
  }

  .table-row__cell_phoneNumber {
    text-align: right;
  }
</style>