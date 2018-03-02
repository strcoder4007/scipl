import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Match from './components/Match.vue'

Vue.use(Router)

export default new Router({
    router: [
        {
            path: '/',
            name: 'helloworld',
            component: HelloWorld
        },
        {
            path: '/match',
            name: 'match',
            component: Match
        }
    ]
})