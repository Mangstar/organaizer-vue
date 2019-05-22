<template>
    <div class='calendar-block mt-4'>
        <div class='wrapper'>
            <app-calendar-header :year="getDate().year" :month="getDate().month" :date="getDate().date" :tasksCount="tasksCount"></app-calendar-header>
            <div class='calendar-body'>
                <app-calendar-titles></app-calendar-titles>
                <app-calendar-days :difference='difference' @show-modal='openModal($event)'></app-calendar-days>
                {{ this.difference }}
                <app-calendar-button 
                                    direction='left'
                                    :classes='["button-toggle-month button-toggle-month--left"]'  
                                    @change-month='changeMonth($event)'>
                </app-calendar-button>
                <app-calendar-button 
                                    direction='right'
                                    :classes='["button-toggle-month button-toggle-month--right"]' 
                                    @change-month='changeMonth($event)'>
                </app-calendar-button>
            </div>
        </div>
        <app-aside-component
            :userAsideState="asideShow"
            :asideTitle="getAsideTitle"
            @aside-ok="onOk"
            @aside-cancel="onCancel"
            ref="task-aside"
        >
            <template #main>
                <div class='add-task-container mt-5'>
                    <input 
                            type='text'
                            class='form-control add-task-input'
                            placeholder='Введите задачу'
                            @keydown.enter='onUpdate(taskValue)'
                            v-model='taskValue'
                    >
                    <button class='add-task-button' @click='onUpdate(taskValue)'>+</button>
                </div>
                <div class="mt-3">Осталось задач: {{ getNeededTasks }}</div>
                <app-progress-bar :progressMax="getProgressMax" :progressValue="getDoneTasks" class="mt-1"></app-progress-bar>
                <transition-group tag="ul" name="slide" class='list-group task-list mt-4'>
                    <app-task-elem
                        v-for='(task, index) in currentTask.tasksList'
                        :key='currentTask.id + "" + index'
                        :task='task'
                        :index='index'
                        :taskObject='currentTask'
                    >
                    </app-task-elem>
                </transition-group>
            </template>
        </app-aside-component>
    </div>
</template>
<script>

    import AsideComponent from './AsideComponent'
    import ProgressBar from './ProgressBar'
    import CalendarHeader from './CalendarHeader'
    import CalendarTitles from './CalendarTitles'
    import CalendarDays from './CalendarDays'
    import ActionButton from './ActionButton'
    import TaskInput from './TaskInput'
    import TaskElem from './taskElem'

    import DeepCopy from '../utils'

    import { mapGetters, mapMutations } from 'vuex';

    export default {
        components: {
            'app-aside-component': AsideComponent,
            'app-progress-bar': ProgressBar,
            'app-calendar-header': CalendarHeader,
            'app-calendar-titles': CalendarTitles,
            'app-calendar-days': CalendarDays,
            'app-calendar-button': ActionButton,
            'app-task-input': TaskInput,
            'app-task-elem': TaskElem
        },
        provide(){
            return {
                allTasksDone: this.allTasksDone
            };
        },
        data(){
            return {
                difference: 0,
                asideShow: false,
                currentTask: {},
                currentTaskBackUp: {},
                taskDate: '',
                taskValue: '',
                months: [
                    'Января',
                    'Февраля',
                    'Марта',
                    'Апреля',
                    'Мая',
                    'Июня',
                    'Июля',
                    'Августа',
                    'Сентября',
                    'Октября',
                    'Ноября',
                    'Декабря'
                ]
            };
        },
        computed: {
            ...mapGetters(['tasks', 'getTaskById', 'daysWithTasks']),
            getCurrentTask(){
                return this.currentTask;
            },
            dayInPast(){
                return Date.now() - Date.parse(this.taskDate).valueOf() >= 86400000;
            },
            getAsideTitle(){
                let
                    date  = new Date(this.taskDate),
                    day   = date.getDate(),
                    month = this.months[ date.getMonth() ],
                    year  = date.getFullYear();

                return `Задачи на ${day} ${month} ${year}`;
            },
            tasksCount(){
                return this.tasks[ new Date().toDateString() ] !== undefined && this.tasks[ new Date().toDateString() ].tasksList.filter(el => !el.done).length || 0;
            },
            getDoneTasks(){
                if ( this.asideShow ) {
                    return this.currentTask.tasksList.filter(task => task.done).length
                };

                return -1;
            },
            getNeededTasks(){
                if ( this.asideShow ) {
                    return this.currentTask.tasksList.filter(task => !task.done).length;
                }
            },
            getProgressMax(){
                if( this.asideShow && this.currentTask.tasksList.length > 0 ){
                    return this.currentTask.tasksList.length;
                }

                return 1;
            }
        },
        methods: {
            ...mapMutations(['addNewTaskDate', 'removeTaskDate', 'editTask', 'removeTask']),
            getDate(){
                let date = new Date();

                return {
                    year:  new Date(date.getFullYear(), date.getMonth() + this.difference, date.getDate()).getFullYear(),
                    month: new Date(date.getFullYear(), date.getMonth() + this.difference, date.getDate() - 1).getMonth(),
                    date:  new Date(date.getFullYear(), date.getMonth() + this.difference, date.getDate()).getDate()
                };
            },
            changeMonth( e ){
                this.difference += e.pressedButton;
            },
            onUpdate( taskValue ){
                if ( taskValue === '' ) return; 
                
                this.currentTask.tasksList.push( { value: taskValue, editState: false, done: false } );

                this.taskValue = '';
            },
            openModal(e){
                this.taskDate = e.date;

                let dayIsExists = this.defineCurrentTask();
                
                // Если день, которой уже прошел, содержит задачи - их нужно показать
                this.asideShow = dayIsExists || !this.dayInPast && !this.asideShow;
            },
            changeAsideState(){
                this.asideShow = !this.asideShow;
            },
            defineCurrentTask(){

                if ( this.getTaskById(this.taskDate) !== undefined ){
                    this.currentTask       = this.getTaskById(this.taskDate);
                    this.currentTaskBackUp = DeepCopy(this.getTaskById(this.taskDate));

                    return true;
                }

                if ( this.dayInPast ) return false;

                this.currentTask = {
                    id: this.taskDate,
                    tasksList: []
                };

                this.addNewTaskDate({ key: this.currentTask.id, value: this.currentTask });

            },
            onCancel(){
                this.changeAsideState();

                if ( this.currentTask !== undefined && this.currentTask.tasksList.length < 1 ) {
                    this.removeTaskDate( this.currentTask.id );
                }

                this.tasks[ this.currentTask.id ] = this.currentTaskBackUp;

                this.currentTask = {};
            },
            onOk(){
                this.changeAsideState();

                if ( this.currentTask.tasksList.length < 1 ) {
                    this.removeTaskDate( this.currentTask.id );
                }
                
                this.currentTask = {};
            }
        }
    }
</script>
<style lang="scss">
    .calendar-body {
        position: relative;
        perspective: 800px;
    }

    @media screen and (max-width: 576px){
        .calendar-body {
            width: 75%;
            margin: 0 auto;
        }
    }

    .modal-dialog {
        max-width: 800px;
    }

    .add-task-container {
        display: flex;
    }

    .add-task-input {
        border-right: 1px solid aqua;
        border-radius: 10px 0 0 10px;
    }

    .add-task-input:focus, .add-task-button:focus {
        box-shadow: 0px 0px 8px 2px aquamarine;
        outline: none;
    }

    .add-task-button {
        width: 50px;
        font-size: 24px;
        background-color: aqua;
        color: #fff;
        border: 1px solid aqua;
        border-radius: 0 10px 10px 0;
    }

    .calendar-body .button-toggle-month {
        width: 40px;
        height: 40px;
        padding: 5px;
        background-color: #fff;
        color: #00ffff;
        transition: transform 0.5s ease;
    }

    .calendar-body .button-toggle-month:hover {
        transform: scale(1.1);
        box-shadow: 0px 0px 8px 2px aquamarine;
    }

    .button-toggle-month--left {
        -webkit-clip-path: polygon(100% 0, 0 50%, 100% 100%);
        clip-path: polygon(100% 0, 0 50%, 100% 100%);
    }

    .button-toggle-month--right {
        -webkit-clip-path: polygon(100% 50%, 0 0, 0 100%);
        clip-path: polygon(100% 50%, 0 0, 0 100%);
    }

    .slide-enter {
        transform: translateY(20px);
    }
    
    .slide-leave-to {
        position: relative;
        z-index: -1;
        transform: translateY(-100%);
    }

    .slide-enter-active, .slide-leave-active {
        transition: transform 0.5s ease;
    }

    @media screen and (max-width: 768px){
        .modal-dialog {
            max-width: 400px;
        }
    }
</style>