<template>
    <div class="calendar-header">

        <div class="calendar-header-date">
            <div class="calendar-header-month">
                {{ months[ month ] }} 
            </div>
            <div class="calendar-header-year">
                {{ year }} 
            </div>
        </div>

        <div class="calendar-header-tasks-count">
            Задач на сегодня: {{ tasksCount }} 
        </div>
        
    </div>
</template>
<script>
    export default {
        props: {
            year: Number,
            month: Number,
            tasksCount: Number
        },
        data(){
            return {
                months: [
                    'Январь',
                    'Февраль',
                    'Март',
                    'Апрель',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентябрь',
                    'Октябрь',
                    'Ноябрь',
                    'Декабрь'
                ]
            };
        }
    }
</script>
<style>
    .calendar-header {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        color:#fff;
        z-index: 1;
    }

    .calendar-header-date {
        display: flex;
        padding-left: 10px;
    }

    .calendar-header-month, .calendar-header-year {
        margin-left: 10px;
        font-size: 24px;
    }

    .calendar-header-tasks-count {
        padding-right: 15px;
    }

</style>