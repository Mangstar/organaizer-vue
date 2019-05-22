<template>
    <transition-group
                name="rollY"
                class="calendar-days"
                tag="div"
                appear
                appear-class="scroll-enter"
                appear-active-class="scroll-enter-active">
        <app-month-day
                    v-for="emptyDay in getEmptyDays"
                    :key="emptyDay / 32"
                    class="calendar-body__day--empty">
        </app-month-day>
        <app-month-day
                    v-for="dayNumber in getDaysCount"
                    class="calendar-body__day--filled"
                    :class="{
                        'day-has-task': existTaskById(dataDates[dayNumber - 1]),
                        'day-today': getToday(dayNumber),
                        'interective-day': !dayInPast(dayNumber),
                        'calendar-body__day-task-complited': allTasksDone(dataDates[dayNumber - 1])
                    }"
                    :key="dataDates[dayNumber - 1]"
                    :date="dataDates[dayNumber - 1]"
                    @date-clicked="onDateClick($event)">
                    {{ dayNumber }}
        </app-month-day>
    </transition-group>
</template>
<script>

    import MonthDay from './MonthDay';

    import { mapGetters, mapMutations } from 'vuex';

    export default {
        props: {
            difference: Number
        },
        components: {
            'app-month-day': MonthDay
        },
        data(){
            return {
                name: 'app-calendar-days',
                currentDate: new Date(),
                dataDates: [],
                modalShowed: false
            };
        },
        computed: {
            ...mapGetters(['tasks', 'existTaskById', 'getTaskById']),
            getDaysCount(){
                return new Date( this.currentDate.getFullYear(), this.currentDate.getMonth() + 1 + this.difference, 0 ).getDate();
            },
            getEmptyDays(){
                let emptyDays = new Date( this.currentDate.getFullYear(), this.currentDate.getMonth() + this.difference, 0 ).getDay();

                return emptyDays;
            },
            getNewMonth(){
                let date = {
                    year:  new Date( this.currentDate.getFullYear(), this.currentDate.getMonth() + 1 + this.difference, 0 ).getFullYear(),
                    month: new Date( this.currentDate.getFullYear(), this.currentDate.getMonth() + 1 + this.difference, 0 ).getMonth()
                };

                return date;
            }
        },
        methods: {
            getDateData( day ){
                return new Date( this.getNewMonth.year, this.getNewMonth.month, day ).toDateString();
            },
            getToday( num ){
                return new Date(this.dataDates[num - 1]).valueOf() <= Date.now() + 86400000 && new Date(this.dataDates[num - 1]).getDate() === new Date().getDate();
            },
            dayInPast(num) {
                return new Date(this.dataDates[num - 1]).valueOf() + 86400000 <= Date.now();
            },
            allTasksDone(day) {
                let task = this.getTaskById( day );

                if ( task !== undefined && task.tasksList !== undefined ) {
                    return task.tasksList.length > 0 && task.tasksList.filter(task => task.done).length === task.tasksList.length;
                }
            },
            updateDatesData(){
                for (let i = 1; i <= this.getDaysCount; i++) {
                    this.dataDates.push( this.getDateData( i ) );
                }
            },
            onDateClick( e ){
                this.$emit('show-modal', {
                    date: e
                });
            },
            generateHash(str) {
                var str = str.toString();

                return str.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0;
                    return (c == 'x' ? r : (r & 0x3 | 0x8 )).toString(16);
                });
            }
        },
        created(){
            this.updateDatesData();
        },
        beforeUpdate() {
            this.dataDates.length = 0;

            this.updateDatesData();
        }
    }
</script>
<style lang="scss">
    .calendar-days {
        height: 320px;
        display: flex;
        flex-wrap: wrap;
        margin-left: -5px;
        margin-right: -5px;
        transform: rotateX(15deg);
    }

    .calendar-body__day {
        flex-basis: calc(100% / 7 - 10px);
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        box-sizing: border-box;
        padding: 10px;
        text-align: center;
        transition: transform 0.5s ease, border-color 0.5s ease;
    }

    .interective-day {
        position: relative;
        border-bottom:5px solid aqua;
    }

    .interective-day, .day-has-task {
        cursor:pointer;
    }

    .interective-day:hover, .day-has-task:hover {
        transform: scale(0.9);
        border-color: aquamarine;
    }

    .day-today {
        position: relative;
        border-top: none;
        border-right: none;
        border-left:none;
        color:#ff7400 !important;
        z-index: 1;
    }

    // .day-today::after {
    //     content: '';
    //     position: absolute;
    //     top: 82%;
    //     left: 0;
    //     width: 100%;
    //     height: 10px;
    //     box-sizing: border-box;
    //     background-color:#ff7400;
    //     z-index: 3;
    // }

    .scroll {
        &-enter {
            transform: translateY(-100px) scale(0);
        }
        &-enter-active, &-leave-active {
            transition: transform 1s ease;
        }
        &-leave-active {
            transition: transform 0s ease;
        }
    }

    .rollY {
        &-enter {
            transform: translateX(30px) rotateY(90deg);
        }
        &-enter-active, &-leave-active, &-move {
            transition: transform 1s ease;
        }
        &-leave-active {
            transition: transform 0s ease;
        }
    }
</style>