<template>
    <div
        class='calendar-body__day'
        :data-date="date"
        @click="$emit('date-clicked', date)">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        date: {
            type: String
        }
    }
}
</script>
<style>
    .calendar-body__day {
        background-color: #fff;
    }

    .day-has-task {
        -webkit-clip-path: polygon(30% 0%, 100% 0, 100% 100%, 0 100%, 0 30%);
        clip-path: polygon(30% 0%, 100% 0, 100% 100%, 0 100%, 0 30%);
        color:#111;
    }

    .calendar-body__day--empty {
        background-color: aqua;
    }

    .calendar-body__day-task-complited {
        border-bottom-color:#00ff05;
    }
</style>