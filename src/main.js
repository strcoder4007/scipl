import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/HelloWorld.vue'
import Match from './components/Match.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
    { path: '/', component: Home },
    { path: '/match', component: Home }
]

const router = new VueRouter({
    routes
})


new Vue({
    router,
  render: h => h(App)
}).$mount('#app')
