System.register(["vuex-persistedstate", "./actions", "./mutations"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vuex_persistedstate_1, actions_1, mutations_1, appstate, storeoptions;
    return {
        setters: [
            function (vuex_persistedstate_1_1) {
                vuex_persistedstate_1 = vuex_persistedstate_1_1;
            },
            function (actions_1_1) {
                actions_1 = actions_1_1;
            },
            function (mutations_1_1) {
                mutations_1 = mutations_1_1;
            }
        ],
        execute: function () {
            appstate = {
                stats: null,
                live_stats: null,
                errorResponse: null,
                users: []
            };
            storeoptions = {
                plugins: [vuex_persistedstate_1.default()],
                state: appstate,
                actions: actions_1.default,
                mutations: mutations_1.default
            };
            exports_1("default", storeoptions);
        }
    };
});
//# sourceMappingURL=options.js.map