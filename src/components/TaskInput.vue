<template>
    <input 
            type="text"
            class="form-control add-task-input"
            placeholder="Введите задачу"
            @keydown.enter="sendTask($event)"
            v-model="taskValue">
</template>
<script>
    export default {
        data(){
            return {
                taskValue: ''
            };
        },
        methods: {
            sendTask(){
                this.$emit('update', { task: this.taskValue });

                this.taskValue = '';
            }
        }
    }
</script>
<style>
    .add-task-input {
        border-right: none;
        border-radius: 10px 0 0 10px;
    }
</style>