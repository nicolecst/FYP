import { createApp } from 'vue'
import { createRouter} from 'vue-router';
import App from './App.vue'
import * as VueRouter from 'vue-router'
import PrimeVue from 'primevue/config';
import LoginView from './pages/LoginView.vue'
import HomeView from './pages/HomeView.vue'
import RegisterView from './pages/RegisterView.vue'
import UserView from './pages/UserView.vue'
import "./assets/style.css"
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(fas)

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
    },{
        path: '/userProfile',
        component: UserView
    }]



const router = createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes
})

export default routes

app.use(router).mount('#app')
app.use(PrimeVue, { unstyled: true });
app.component('font-awesome-icon', FontAwesomeIcon)
