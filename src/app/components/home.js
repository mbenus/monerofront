System.register(["vue", "vuex", "./network", "./pool"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vue_1, vuex_1, network_1, pool_1, Home;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (vuex_1_1) {
                vuex_1 = vuex_1_1;
            },
            function (network_1_1) {
                network_1 = network_1_1;
            },
            function (pool_1_1) {
                pool_1 = pool_1_1;
            }
        ],
        execute: function () {
            Home = vue_1.default.extend({
                components: {
                    'network': network_1.default,
                    'pool': pool_1.default
                },
                template: "\n        <div>\n            <h1>Home</h1>\n            <router-link to=\"/about\">Ga naar About</router-link>\n            <network :stats=\"stats\"></network>\n            <pool :stats=\"stats\"></pool>\n        </div>",
                computed: vuex_1.default.mapState({
                    stats: function (state) { return state.stats; },
                    live_stats: function (state) { return state.live_stats; }
                }),
                mounted: function () {
                    this.requestStats();
                    this.requesLivestats();
                },
                methods: {
                    requestStats: function () {
                        this.$store.dispatch('getStats');
                    },
                    requesLivestats: function () {
                        this.$store.dispatch('getLiveStats');
                    }
                }
            });
            exports_1("default", Home);
        }
    };
});
//# sourceMappingURL=home.js.map