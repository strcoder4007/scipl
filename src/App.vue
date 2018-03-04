<template>
    <div id="app">
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" />
        <p>
            <router-link to="/">Home</router-link>
            <router-link to="Match">Match</router-link>            
        </p>
        -->
        <router-view></router-view>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
    name: 'app',
    components: {
        HelloWorld
    }
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import url('https://fonts.googleapis.com/css?family=Anton');
@import url('https://fonts.googleapis.com/css?family=Roboto');
#app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.gutter-0.row {
    margin-right: 0;
    margin-left: 0;
}

.gutter-0>[class^="col-"] {
    padding-right: 0;
    padding-left: 0;
}
</style>