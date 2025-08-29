<template>
  <div >
    <h1>{{ tableData }}</h1>
  </div>
</template>

<script>
import { tableData } from './tableData'

export default {
  name: 'App',

  data() {
    return {
        tableData,
    }
  },
}
</script>

<style>
</style>