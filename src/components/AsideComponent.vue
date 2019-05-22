<template>
    <transition name="slideIn" mode="out-in">
        <div class="aside-component" v-show="asideState">
            <slot name="header">
                <div class="aside-component-header">
                    <h2 class="aside-component-title">{{ asideTitle }}</h2>
                    <slot name="buttons">
                        <div class="aside-component-buttons">
                            <button @click="successCloseAsideComponent" class="button aside-button aside-button-ok">&#10003;</button>
                            <button @click="closeAsideComponent" class="button aside-button aside-button-cancel">&#10007;</button>
                        </div>
                    </slot>
                </div>
            </slot>
            <slot name="main"></slot>
        </div>
    </transition>
</template>
<script>
    export default {
        props: {
            userAsideState: {
                type: Boolean,
                default: false
            },
            asideTitle: {
                type: String,
                default: 'Боковое меню'
            }
        },
        data(){
            return {
                asideState: false
            };
        },
        computed: {
            
        },
        methods: {
            successCloseAsideComponent(){
                this.$emit('aside-ok');
            },
            closeAsideComponent(){
                this.$emit('aside-cancel');
            },
            hide(){
                this.asideState = false;
            }
        },
        watch: {
            userAsideState(){
                this.asideState = this.userAsideState;
            }
        }
    }
</script>
<style>
    .aside-component {
        width: 50vw;
        height: 100vh;
        position: fixed;
        top: 0;
        right: 0;
        box-sizing: border-box;
        padding: 10px 15px;
        background-color: #fff;
        color: #333;
        z-index: 2;
    }

    .aside-component::before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: -100%;
        background-color: rgba(1, 1, 1, 0.95);
    }

    .aside-component-header {
        display: flex;
        justify-content: space-between;
    }

    .aside-button {
        background-color: transparent;
        font-size: 18px;
        background-color: rgba(1, 1, 1, 0.95);
        color:#00ffff;
    }

    .aside-button-ok {
        right: 50px;
    }

    .aside-button-cancel {
        right: 10px;
    }

    .slideIn-enter {
        right: -100%;
    }

    .slideIn-enter-to {
        right: 0;
    }

    .slideIn-enter-active, .slideIn-leave-active {
        transition: right 0.5s ease, top 0.5s ease;
    }

    .slideIn-leave-to {
        top: -100%;
    }

</style>