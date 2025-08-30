<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppModal',

    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: #fff;
  min-width: 300px;
  max-width: 500px;
  position: relative;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}
</style>