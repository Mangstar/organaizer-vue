<template>
    <div class="calendar-titles">
        <div class="calendar-titles__elem">Пн</div>
        <div class="calendar-titles__elem">Вт</div>
        <div class="calendar-titles__elem">Ср</div>
        <div class="calendar-titles__elem">Чт</div>
        <div class="calendar-titles__elem">Пт</div>
        <div class="calendar-titles__elem">Сб</div>
        <div class="calendar-titles__elem">Вс</div>
    </div>
</template>
<script>
    export default {

    }
</script>
<style>
    .calendar-titles {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-left: -5px;
        margin-right: -5px;
    }

    .calendar-titles__elem {
        flex-basis: calc(100% / 7 - 15px);
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        box-sizing: border-box;
        padding: 10px;
        text-align: center;
        font-weight: bold;
        border: 3px solid aqua;
        background-color: #fff;
    }
</style>