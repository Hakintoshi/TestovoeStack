<template>
  <form class="app-form">
    <h3 class="app-form__title">Добавить организацию</h3>
    <hr class="app-form__line" />
    <div class="app-form__inputs">
      <AppInput
        v-for="inp in formData"
        type="text"
        :placeholder="inp.placeholder"
        :value="inp.value"
        @input="value => (inp.value = value)"
      />
    </div>
    <hr class="app-form__line" />
    <div class="app-form__btns">
      <AppButton @click.native.prevent="$emit('closeModal')">Отмена</AppButton>
      <AppButton @click.native.prevent="sendForm" :disabled="disableButton"
        >Ок</AppButton
      >
    </div>
  </form>
</template>

<script>
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';

export default {
  name: 'AppForm',

  components: {
    AppButton,
    AppInput,
  },

  data() {
    return {
      formData: {
        company: { value: null, placeholder: 'Название' },
        phoneNumber: { value: null, placeholder: 'Номер телефона' },
        directorName: { value: null, placeholder: 'ФИО Директора' },
      },
    };
  },

  computed: {
    disableButton() {
      return !Object.values(this.formData).every(el => el.value);
    },
  },

  methods: {
    sendForm() {
      if (this.disableButton) return;

      this.$emit('addRow', this.formData);
    },
  },
};
</script>

<style scoped>
.app-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
}

.app-form__title {
  margin: 20px 0 0 0;
}

.app-form__line {
  width: 100%;
  height: 2px;
  background-color: rgb(117, 117, 117);
  border: 0;
  margin: 20px 0;
}

.app-form__inputs {
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.app-form__btns {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}
</style>
