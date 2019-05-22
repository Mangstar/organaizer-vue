<template>
    <div>
        <label v-show="!getTask.editState">
            {{ getTask.value }}
        </label>
        <input
            v-show="getTask.editState"
            type="text"
            v-model="getTask.value"
            @keypress.enter="editTask($event, index)">
    </div>
</template>
<script>
    export default {
        inject: ['getTask']
    }
</script>
<style>

</style>