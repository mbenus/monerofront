import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Home from "./pages/home"
import Netwerk from "./pages/netwerk"
import Poel from "./pages/poel"
import About from "./pages/about"
import Gebruiker from "./pages/gebruiker"
import GettingStarted from "./pages/gettingstarted"

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
    { path: "/netwerk", component: Netwerk },
    { path: "/poel", component: Poel },
    { path: "/about", component: About },
    { path: "/gebruiker", component: Gebruiker },
    { path: "/gettingstarted", component: GettingStarted },
];

const routerconfig = {
    routes: routes
};

const router = new VueRouter(routerconfig);

new Vue({
    router,
    store
}).$mount("#app");