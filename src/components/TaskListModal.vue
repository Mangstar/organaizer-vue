<template>
    <ul class="list-group mt-4">
        <app-task-elem
            v-for="(task, index) in currentTask.tasksList"
            :key="index"
        >
        </app-task-elem>
    </ul>
</template>
<script>

    import TaskElem from './TaskElem'

    export default {
        components: {
            'app-task-elem': TaskElem
        },
        provide() {
            return {
                getTask(){
                    return ;
                }
            }
        },
        props: {
            taskValue: String,
            taskEditState: Boolean
        }
    }
</script>
<style>

</style>