System.register(["vue", "vuex", "./users"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vue_1, vuex_1, users_1, Statistics;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (vuex_1_1) {
                vuex_1 = vuex_1_1;
            },
            function (users_1_1) {
                users_1 = users_1_1;
            }
        ],
        execute: function () {
            Statistics = vue_1.default.extend({
                components: {
                    'users': users_1.default
                },
                template: "\n        <div>\n            <h1>Your Statistics &amp; Payment History</h1>\n            <users \n                :users=\"users\"\n                v-on:requestUserData=\"requestUserData\"\n                v-on:deleteUserData=\"deleteUserData\"\n            ></users>\n        </div>",
                computed: vuex_1.default.mapState({
                    users: function (state) { return state.users; },
                }),
                methods: {
                    requestUserData: function (xmraddress) {
                        var params = {
                            force: true,
                            xmraddress: xmraddress
                        };
                        this.$store.dispatch('getUserData', params);
                    },
                    deleteUserData: function (xmraddress) {
                        this.$store.dispatch('deleteUserData', xmraddress);
                    }
                }
            });
            exports_1("default", Statistics);
        }
    };
});
//# sourceMappingURL=statistics.js.map