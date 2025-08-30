<template>
  <tr class="table-header">
    <td
      v-for="(header, key) in headers"
      :key
      class="table-header"
      :class="{'table-header_sortable': header.sortable}"
      @click="header.sortable && clickOnHeader(key)"
    >
      <div class="table-header__wrapper">
        <span>{{ header.value }}</span>
        <i 
          v-show="header.sortable && fieldBySort === key && quantityRows > 1" 
          class="material-icons">
          {{ directionArrow }}
        </i>
      </div>
    </td>
  </tr>
</template>

<script>

export default {
  name: 'TableHeader',

  props: {
    headers: {
        type: Object,
    },
    fieldBySort: {
      type: String,
      default: null,
    },
    sortBy: {
      type: String,
      default: 'asc',
    },
    quantityRows: {
      type: Number,
      default: 0,
    }
  },

  computed: {
    directionArrow() {
      return this.sortBy === 'asc' ? 'arrow_upward' : 'arrow_downward';
    },
  },

  methods: {
    clickOnHeader(key) {
      if(this.quantityRows < 1) return;

      this.$emit('sortByField', key, this.sortBy)
    }
  }
}
</script>

<style>
  .table-header {
    text-align: center;
    padding: 15px 10px;
    font-size: 22px;
    color: rgb(117, 117, 117);
  }

  .table-header_sortable {
    cursor: pointer;
  }

  .table-header__wrapper {
     display: flex;
     justify-content: center;
     align-items: center;
     gap: 10px;
  } 
</style>