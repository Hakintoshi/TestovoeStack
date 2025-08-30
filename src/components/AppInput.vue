<template>
  <div class="app-input">
    <input
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
      class="input"
    >
  </div>
</template>

<script>
export default {
  name: 'AppInput',

  props: {
    value: String,

    placeholder: String,

    type: {
      type: String,
      default: "text"
    },
  }
}
</script>

<style scoped>
.app-input {
  display: flex;
  flex-direction: column;
}

.input {
  padding: 8px 12px;
  border: 1px solid rgb(0, 0, 0);
  font-size: 16px;
}

.input:focus {
  border-color: rgb(117, 117, 117);
  outline: none;
}
</style>