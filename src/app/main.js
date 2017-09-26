System.register(["vue", "vue-router", "vuex", "./components/home", "./components/about", "./components/statistics", "./store/options"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vue_1, vue_router_1, vuex_1, home_1, about_1, statistics_1, options_1, store, routes, routerconfig, router;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (vue_router_1_1) {
                vue_router_1 = vue_router_1_1;
            },
            function (vuex_1_1) {
                vuex_1 = vuex_1_1;
            },
            function (home_1_1) {
                home_1 = home_1_1;
            },
            function (about_1_1) {
                about_1 = about_1_1;
            },
            function (statistics_1_1) {
                statistics_1 = statistics_1_1;
            },
            function (options_1_1) {
                options_1 = options_1_1;
            }
        ],
        execute: function () {
            vue_1.default.use(vue_router_1.default);
            vue_1.default.use(vuex_1.default);
            store = new vuex_1.default.Store(options_1.default);
            routes = [
                { path: "/", component: home_1.default },
                { path: "/home", component: home_1.default },
                { path: "/about", component: about_1.default },
                { path: "/statistics", component: statistics_1.default },
            ];
            routerconfig = {
                routes: routes
            };
            router = new vue_router_1.default(routerconfig);
            new vue_1.default({
                router: router,
                store: store
            }).$mount("#app");
        }
    };
});
//# sourceMappingURL=main.js.map