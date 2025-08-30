<template>
    <button 
        class='app-button'
        :disabled="disabled"
        :class="{'app-button_disabled': disabled}" 
        @click="$emit('click')"
    >
            <slot></slot>
        </button>
</template>

<script>
export default {
    name: 'AppButton',

    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
<style scoped>
    .app-button {
        background: transparent;
        font-size: 16px;
        padding: 5px 15px;
        border: 1px solid rgb(0, 0, 0);
        cursor: pointer;
    }

    .app-button_disabled {
        cursor: default;
    }
</style>