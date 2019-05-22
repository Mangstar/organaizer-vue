<template>
    <li class="list-group-item list-task-elem">
        <label
                class="edit-task-label"
                v-show="!task.editState"
                :class="{'task-is-done': task.done}"
        >
            {{ task.value }}
        </label>
        <input
            v-show="task.editState"
            type="text"
            class="edit-task-input"
            :ref="'editTaskInput' + (index + 1 + '')"
            v-model="task.value"
            @keypress.enter="editTaskValue({id: taskObject.id, index: index})"
        >

        <span class="task-buttons">

            <app-task-action-button @clicked="taskIsDone({id: taskObject.id, index: index})" className="task-button-done">

                <transition name="rotate" mode="out-in">
                    <icon v-if="!task.done" name="clock" key="state-pending" class="task-is-pending-icon"></icon>
                    <icon v-else name="check" key="state-done" class="task-is-done-icon"></icon>
                </transition>

            </app-task-action-button>

            <app-task-action-button @clicked="editTaskValue({id: taskObject.id, index: index})" className="task-button-edit">
                <icon name="pen"></icon>
            </app-task-action-button>

            <app-task-action-button @clicked="deleteTask({id: taskObject.id, index: index})">
                <icon name="times"></icon>
            </app-task-action-button>

        </span>
    </li>
</template>
<script>

    import TaskElemText from './TaskElemText'
    import TaskActionButton from './TaskActionButton'
    import Icon from 'vue-awesome/components/Icon'

    import Pen from 'vue-awesome/icons/pen'
    import Times from 'vue-awesome/icons/times'
    import Clock from 'vue-awesome/icons/clock'
    import Check from 'vue-awesome/icons/check'

    import { mapActions } from 'vuex'
    
    export default {
        components: {
            'app-task-elem-text': TaskElemText,
            'app-task-action-button': TaskActionButton,
            Icon
        },
        computed: {
            
        },
        methods: {
            ...mapActions(['editTask', 'deleteTask', 'taskIsDone']),
            editTaskValue( task ){
                this.editTask(task);
                
                window.requestAnimationFrame(() => {
                    window.requestAnimationFrame(() => {
                        this.$refs[ 'editTaskInput' + (task.index + 1 + '') ].focus();
                    });
                });
            }
        },
        props: {
            task: Object,
            taskObject: Object,
            index: Number
        }
    }
</script>
<style lang="scss">
    .list-task-elem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 10px;
        padding-left: 0;

        &-label {
            width: 70%;
            margin-bottom: 0;
            padding-left: 10px;
            word-break: break-all;
        }
    }

    .edit-task {
        &-label {
            width: 70%;
            margin-bottom: 0;
            padding-left: 10px;
            word-break: break-all;
        }

        &-input {
            width: 70%;
            margin-left: 10px;
            border: none;
            outline: none;

            &:focus {
                box-shadow: 0px 0px 8px 2px aquamarine;
            }
        }
    }

    .task-is {
        &-done {
            text-decoration: line-through;
        }
    }

    .task-buttons {
        display: flex;
    }

    .task-button:not(:last-child) {
        margin-right: 5px;
    }

    .rotate {
        &-enter {
            transform: rotateY(90deg);
        }
        &-leave {
            transform: rotateY(-90deg);
        }
        &-enter-active, &-leave-active {
            transition: transform 0.4s ease;
        }
    }

</style>