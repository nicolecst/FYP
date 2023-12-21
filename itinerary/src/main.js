import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import LoginView from './pages/LoginView.vue'
import HomeView from './pages/HomeView.vue'

createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
        path: '/login',
        component: LoginView
    }, {
        path: '/',
        component: HomeView
    }]
}))
.mount('#app')
