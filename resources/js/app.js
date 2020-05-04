/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vuetify from 'vuetify';
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import router from './router/router'
import User from './helpers/user'
import md from 'marked'

window.Vue = require('vue');
window.User = User
window.md = md
window.EventBus = new Vue()
Vue.use(Vuetify);
Vue.component('vue-simplemde', VueSimplemde)

//Auto Set Header JWT token
let JWTToken = `Bearer ${localStorage.getItem('token')}`
window.axios.defaults.headers.common['Authorization'] = JWTToken;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('AppHome', require('./components/AppHome.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify(),
});
