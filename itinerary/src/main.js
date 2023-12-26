import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import PrimeVue from 'primevue/config';
import LoginView from './pages/LoginView.vue'
import HomeView from './pages/HomeView.vue'
import RegisterView from './pages/RegisterView.vue'

const app = createApp(App)
app.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
        path: '/login',
        component: LoginView
    }, {
        path: '/',
        component: HomeView
    },{
        path: '/register',
        component: RegisterView
    }]
}))
.mount('#app')

app.use(PrimeVue, { unstyled: true });
