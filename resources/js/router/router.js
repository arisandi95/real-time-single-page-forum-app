import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import Forum from '../components/forum/Forum'
import Logout from '../components/auth/Logout'

const routes = [
    { path: '/login', component: Login },
    { path: '/logout', component: Logout},
    { path: '/signup', component: Signup },
    { path: '/forum', component: Forum , name: 'forum'},
]

const router = new VueRouter({
    routes,
    hasbang : false,
    mode : 'history'
})

export default router
