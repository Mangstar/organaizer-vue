<template>
    <div class="progress-bar-container">
        <div class="progress-bar" :style="progressStyle"></div>
    </div>
</template>
<script>
    export default {
        props: {
            progressValue: {
                type: Number,
                required: true
            },
            progressMax: {
                type: Number,
                required: true
            }
        },
        computed: {
            progressStyle(){
                return {
                    width: this.calcWidth,
                    backgroundColor: this.backgroundColor
                };
            },
            calcWidth(){
                return (100 / this.progressMax * this.progressValue) < 100 ? 100 / this.progressMax * this.progressValue + '%' : '100%';
            },
            backgroundColor(){
                let width = parseInt(this.calcWidth);

                if ( width < 50 ) {
                    return '#8B0004';
                } else if( width >= 50 && width < 100 ) {
                    return '#FFE81C';
                } else {
                    return '#00ff05';
                }
            }
        }
    }
</script>
<style>
    .progress-bar-container {
        box-sizing: border-box;
        border-radius: 5px;
        border: 1px solid #00ffff; 
    }

    .progress-bar {
        height: 30px;
        background-color: #00ffff;
    }
</style>