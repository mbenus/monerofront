System.register(["vue", "./../common/mixins", "./payments"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vue_1, mixins_1, payments_1, UserStats;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (mixins_1_1) {
                mixins_1 = mixins_1_1;
            },
            function (payments_1_1) {
                payments_1 = payments_1_1;
            }
        ],
        execute: function () {
            UserStats = vue_1.default.extend({
                components: {
                    'payments': payments_1.default
                },
                mixins: [mixins_1.formatdata],
                template: "\n    <div class=\"stats\" v-if=\"showMe()\">\n        <div class=\"yourStats\" style=\"display: block;\">\n            <i class=\"fa fa-key\"></i>\n            Address: \n            <span id=\"yourAddressDisplay\">{{user.xmraddress}}</span>\n            <button class=\"btn btn-danger\" type=\"button\" v-on:click=\"deleteAddress($event)\">\n                <span style=\"display: inline;\"><i class=\"fa fa-trash\"></i>Remove</span>\n            </button>\n        </div>\n        <div>\n            <i class=\"fa fa-bank\"></i> \n            Pending Balance: \n            <span id=\"yourPendingBalance\">{{getReadableCoins(user.userstats.balnce)}}</span>\n        </div>\n        <div>\n            <i class=\"fa fa-money\"></i>\n            Total Paid:\n            <span id=\"yourPaid\">{{getReadableCoins(user.userstats.stats.paid)}}</span>\n        </div>\n        <div>\n            <i class=\"fa fa-clock-o\"></i>\n            Last Share Submitted: \n            <span id=\"yourLastShare\">{{formatTimestamp(user.userstats.stats.lastShare)}}</span>\n        </div>\n        <div>\n            <i class=\"fa fa-tachometer\"></i> \n            Hash Rate: \n            <span id=\"yourHashrateHolder\">{{displayHashrate(user.userstats.stats.hashrate)}}</span>\n        </div>\n        <div>\n            <i class=\"fa fa-cloud-upload\"></i> \n            Total Hashes Submitted: \n            <span id=\"yourHashes\">{{user.userstats.stats.hashes}}</span>\n        </div>\n        <payments :rawpayments2=\"user.userstats.payments\"></payments>\n    </div>",
                props: ['user'],
                methods: {
                    showMe: function () {
                        return (this.user !== undefined && this.user !== null);
                    },
                    deleteAddress: function (ev) {
                        ev.preventDefault();
                        this.$emit('deleteUserData', this.user.xmraddress);
                    },
                    displayHashrate: function (hashrate) {
                        var t = (hashrate) ? hashrate : '0 H';
                        return t + '/sec';
                    }
                }
            });
            exports_1("default", UserStats);
        }
    };
});
//# sourceMappingURL=userstats.js.map