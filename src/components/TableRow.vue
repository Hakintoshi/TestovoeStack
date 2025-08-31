<template>
  <tr class="table-row">
    <td
      v-for="(value, key) in rowData"
      :key
      class="table-row__cell"
      :class="{ 'table-row__cell_phoneNumber': key === 'phoneNumber' }"
    >
      {{ key === 'phoneNumber' ? formatField(value) : value }}
    </td>
    <td class="table-row__delete-icon">
      <i class="material-icons" @click="$emit('deleteRow', id)">close</i>
    </td>
  </tr>
</template>

<script>
import { formatPhone } from '../utils/formatPhone.js';

export default {
  name: 'TableRow',

  props: {
    rowData: {
      type: Object,
    },
    id: {
      type: Number,
      default: 1,
    },
  },

  methods: {
    formatField(value) {
      return formatPhone(value);
    },
  },
};
</script>

<style>
.table-row__cell {
  padding: 5px 10px;
  font-size: 20px;
}

.table-row__cell_phoneNumber {
  text-align: right;
}

.table-row__delete-icon {
  text-align: center;
}

.material-icons {
  cursor: pointer;
}

.material-icons:hover {
  color: rgb(204, 21, 21);
}
</style>
