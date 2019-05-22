<template>
    <button 
            class="button button-toggle-month"
            :class="classes"
            :direction="direction"
            @click="changeMonth">
        <slot></slot>
    </button>
</template>
<script>
    export default {
        props: {
            direction: {
                type: String
            },
            classes: {
                type: Array
            }
        },
        methods: {
            changeMonth(){
                let pressedButton = this.direction === 'right' ? 1 : -1;
                
                this.$emit('change-month', {
                    pressedButton
                });
            }
        }
    }
</script>
<style>
    .button {
        box-sizing: border-box;
        padding: 0.5em 1.5em;
        font-size: 16px;
        border: none;
        background-color: aqua;
        color: #fff;
        cursor: pointer;
        outline: none;
        box-shadow: 0px 0px 8px 2px transparent;
        transition: color 0.5s ease, background 0.5s ease, box-shadow 0.5s ease;
    }

    .button:hover {
        background-color: #fff;
        color: aqua;
        box-shadow: 0px 0px 8px 2px aquamarine;
    }

    .button-toggle-month {
        position: absolute;
        top: 50%;
        font-weight: bold;
    }

    .button-toggle-month--left {
        left: -10%;
    }

    .button-toggle-month--right {
        right: -10%;
    }

    @media screen and (max-width: 576px){
        .button-toggle-month--left {
            left: -15%;
        }

        .button-toggle-month--right {
            right: -15%;
        }
    }
</style>