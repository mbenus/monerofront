System.register(["vue", "./../common/mixins"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vue_1, mixins_1, Network;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (mixins_1_1) {
                mixins_1 = mixins_1_1;
            }
        ],
        execute: function () {
            Network = vue_1.default.extend({
                mixins: [mixins_1.formatdata],
                template: "\n    <div class=\"network\" v-if=\"showMe()\">\n        <h3>Networks</h3>\n        <div>\n            <i class=\"fa fa-tachometer\"></i>\n            Hash Rate: \n            <span>{{getReadableHashRateString(stats.network.difficulty)}}</span>\n        </div>\n        <div>\n            <i class=\"fa fa-clock-o\"></i>\n            Block Found:\n            <span>{{formatTimestamp(stats.network.timestamp)}}</span>\n        </div>\n        <div>\n            <i class=\"fa fa-unlock-alt\"></i>\n            Difficulty:\n            <span>{{stats.network.difficulty}}</span></div>\n        <div>\n            <i class=\"fa fa-bars\"></i>\n            Blockchain Height:\n            <span>{{stats.network.height}}</span>\n        </div>\n        <div>\n            <i class=\"fa fa-money\"></i>\n            Last Reward:\n            <span>{{getReadableCoins(stats.network.reward, 4)}}</span>\n        </div>\n        <div>\n            <i class=\"fa fa-paw\"></i>\n            Last Hash:\n            <a target=\"_blank\" :href=\"getBlockHref(this.stats.network.hash)\">{{getBlockLink(this.stats.network.hash)}}</a>\n        </div>\n    </div>",
                props: ['stats'],
                methods: {
                    showMe: function () {
                        return (this.stats !== undefined && this.stats !== null);
                    }
                }
            });
            exports_1("default", Network);
        }
    };
});
//# sourceMappingURL=network.js.map