<template>
  <div id="app">
    <app-calendar></app-calendar>
  </div>
</template>

<script>

  // import './assets/sass/main.sass';
  import Calendar from './components/Calendar';

  export default {
    name: 'app',
    components: {
      'app-calendar': Calendar
    },
    data () {
      return {
        
      }
    }
  }
</script>

<style lang="scss">
  .wrapper {
    max-width: 980px;
    margin: 0 auto;
  }

  @media screen and (max-width: 576px){
    .calendar-body {
        width: 75%;
        margin: 0 auto;
    }
  }
</style>
