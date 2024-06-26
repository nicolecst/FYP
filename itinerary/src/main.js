import { createApp } from 'vue'
import { createRouter} from 'vue-router';
import App from './App.vue'
import * as VueRouter from 'vue-router'
import PrimeVue from 'primevue/config';
import LoginView from './pages/LoginView.vue'
import HomeView from './pages/HomeView.vue'
import RegisterView from './pages/RegisterView.vue'
import UserView from './pages/UserView.vue'
import UserEdit from './pages/UserEdit.vue'
import ActivitiesView from './pages/ActivitiesView.vue'
import ActDetails from './pages/ActDetails.vue'
import AdminHome from './pages/AdminHome.vue'
import ActEdit from './pages/ActEdit.vue'
import ProposeAct from './pages/ProposeAct.vue'
import CreateItinerary from './pages/CreateItinerary.vue'
import ItinHistory from './pages/ItinHistory.vue'
import ItinhistDetails from './pages/ItinhistDetails.vue'
import itindetailsUpdate from './pages/ItindetailsUpdate.vue'
import AllHistory from './pages/AllHistory.vue'
import TestEmail from './pages/TestEmail.vue'
import "./assets/style.css"
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


/* add icons to the library */
library.add(fas, far)

const app = createApp(App)

const routes = [{
        path: '/login',
        component: LoginView
    }, {
        path: '/',
        component: HomeView
    },{
        path: '/admin',
        component: AdminHome
    },{
        path: '/register',
        component: RegisterView
    },{
        path: '/userProfile',
        component: UserView
    },{
        path: '/userEdit',
        component: UserEdit
    },{
        path: '/activities',
        component: ActivitiesView
    },{
        path: '/actDetails/:id',
        component: ActDetails
    },{
        path: '/actEdit/:id',
        component: ActEdit
    },{
        path: '/propose',
        component: ProposeAct
    },{
        path: '/create',
        component: CreateItinerary
    },{
        path: '/history',
        component: ItinHistory
    },{
        path: '/history/:id',
        component: ItinhistDetails
    },{
        path: '/itinEdit/:id',
        component: itindetailsUpdate
    },{
        path: '/forum',
        component: AllHistory
    },{
        path: '/testEmail',
        component: TestEmail
    },]



const router = createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes
})

export default routes

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router).mount('#app')
app.use(PrimeVue, { unstyled: true });

