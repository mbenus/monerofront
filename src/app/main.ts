import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Home from "./components/home"
import About from "./components/about"
import Statistics from "./components/statistics"

import storeoptions from "./store/options"

// globals
// import find from "lodash.find";
// import clone from "lodash.clone";

Vue.use(VueRouter);
Vue.use(Vuex);

var store = new Vuex.Store(storeoptions);

const routes = [
    { path: "/", component: Home },
    { path: "/home", component: Home },
    { path: "/about", component: About },
    { path: "/statistics", component: Statistics },
];

const routerconfig = {
    routes: routes
};

const router = new VueRouter(routerconfig);

new Vue({
    router,
    store
}).$mount("#app");