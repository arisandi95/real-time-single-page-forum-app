import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import Forum from '../components/forum/Forum'
import Read from '../components/forum/Read'
import Create from '../components/forum/Create'
import Logout from '../components/auth/Logout'
import CreateCategory from '../components/category/CreateCategory'

const routes = [
    { path: '/login', component: Login },
    { path: '/logout', component: Logout},
    { path: '/signup', component: Signup },
    { path: '/forum', component: Forum , name: 'forum'},
    { path: '/ask', component: Create , name: 'ask'},
    { path: '/question/:slug', component: Read , name: 'read'},
    { path: '/category', component: CreateCategory},
]

const router = new VueRouter({
    routes,
    hasbang : false,
    mode : 'history'
})

export default router
