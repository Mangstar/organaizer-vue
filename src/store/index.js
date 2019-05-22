import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tasks: {
            "Tue Apr 23 2019": {
                id: "Tue Apr 23 2019",
                tasksList: [
                    {
                        value: 'Выучить vue js',
                        editState: false,
                        done: false
                    }
                ]
            },
            "Wed Apr 24 2019": {
                id: "Wed Apr 24 2019",
                tasksList: [
                    {
                        value: 'Повторить паттерны js',
                        editState: false,
                        done: false
                    },
                    {
                        value: 'Выпить кофе',
                        editState: false,
                        done: false
                    }
                ]
            },
            "Sun Apr 28 2019": {
                id: "Sun Apr 28 2019",
                tasksList: [
                    {
                        value: 'Сделать фронт органайзера',
                        editState: false,
                        done: false
                    },
                    {
                        value: 'Купить пиццу',
                        editState: false,
                        done: false
                    }
                ]
            }
        },
        daysWithTasks: []
    },
    getters: {
        tasks(state){
            return state.tasks;
        },
        getTaskById: state => id => {
            return state.tasks[ id ];
        },
        existTaskById: state => id => {
            return state.tasks[ id ] !== undefined && state.tasks[ id ].tasksList.length > 0;
        },
        daysWithTasks(state){
            return state.daysWithTasks;
        }
    },
    mutations: {
        addNewTaskDate(state, task){
            Vue.set(state.tasks, task.key, task.value);
        },
        removeTaskDate(state, task){
            Vue.delete(state.tasks, task.id);
        },
        editTask(state, task){
            state.tasks[ task.id ].tasksList[ task.index ].editState = !state.tasks[ task.id ].tasksList[ task.index ].editState;
        },
        deleteTask(state, task){
            state.tasks[ task.id ].tasksList.splice(task.index, 1);
        },
        taskIsDone(state, task){
            state.tasks[ task.id ].tasksList[ task.index ].done = !state.tasks[ task.id ].tasksList[ task.index ].done;
        }
    },
    actions: {
        getTasks(store){
            // const tasksList = axios.get();
        },
        addNewTaskDate(store, task){
            if ( !task.tasksList.length > 0 ) return;

            store.commit('addNewTaskDate', task);
        },
        removeTaskDate(store, task){
            store.commit('removeTaskDate');
        },
        editTask(store, task){
            store.commit('editTask', task);

            if(store.state.tasks[ task.id ].tasksList[ task.index ].value === '') {
                store.commit('deleteTask', task);
            }
        },
        deleteTask(store, task){
            store.commit('deleteTask', task);
        },
        taskIsDone(store, task){
            store.commit('taskIsDone', task);
        }
    }
});