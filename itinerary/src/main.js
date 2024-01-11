import { createApp } from 'vue'
import { createRouter} from 'vue-router';
import App from './App.vue'
import * as VueRouter from 'vue-router'
import PrimeVue from 'primevue/config';
import LoginView from './pages/LoginView.vue'
import HomeView from './pages/HomeView.vue'
import RegisterView from './pages/RegisterView.vue'
import "./assets/style.css"

const app = createApp(App)

const routes = [{
        path: '/login',
        component: LoginView
    }, {
        path: '/',
        component: HomeView
    },{
        path: '/register',
        component: RegisterView
    }]



const router = createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes
})

export default routes

app.use(router).mount('#app')
app.use(PrimeVue, { unstyled: true });
