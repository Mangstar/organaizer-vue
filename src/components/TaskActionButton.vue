<template>
    <button class="button task-button" :class="className" @click="$emit('clicked')">
        <slot></slot>
    </button>
</template>
<script>
    export default {
        props: {
            className: String
        }
    }
</script>
<style>

</style>