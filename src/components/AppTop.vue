<template>
  <div class="app-top">
    <AppInput 
      @input="$emit('search', $event)" 
      placeholder="Найти по ФИО..."
    />
    <AppButton class="app-top__btn" @click="$emit('open')">Добавить</AppButton>
  </div>
</template>

<script>
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';

export default {
  name: 'AppTop',

  components: {
    AppButton,
    AppInput,
  },

  data() {
    return {
    }
  },
}
</script>

<style>
    .app-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>