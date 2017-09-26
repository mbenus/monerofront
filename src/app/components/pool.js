System.register(["vue", "./../common/mixins"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vue_1, mixins_1, Pool;
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
            Pool = vue_1.default.extend({
                mixins: [mixins_1.formatdata],
                template: "\n    <div class=\"network\" v-if=\"showMe()\">\n        <h3>Our Pool</h3>\n        <div>\n            <i class=\"fa fa-tachometer\"></i>\n            Hash Rate: \n            <span>{{getReadableHashRateString(stats.pool.hashrate * 120)}}</span>\n        </div>\n        <div>\n            <i class=\"fa fa-clock-o\"></i>\n            Block Found:\n            <span>{{formatTimestamp(stats.pool.lastBlockFound)}}</span>\n        </div>\n        <div>\n            <i class=\"fa fa-users\"></i>\n            Connected Miners:\n            <span>{{stats.pool.miners}}</span></div>\n        <div>\n            <i class=\"fa fa-gift\"></i>\n            Donations:\n            <span>{{getFeeText()}}</span>\n        </div>\n        <div>\n            <i class=\"fa fa-money\"></i>\n            Total Pool Fee:\n            <span>{{getTotalFee()}}</span>\n        </div>\n        <div>\n            <i class=\"fa fa-history\"></i>\n            Block Found Every:\n            <span>{{getBlocksFound()}}</span> (est.)\n        </div>\n    </div>",
                props: ['stats'],
                methods: {
                    showMe: function () {
                        return (this.stats !== undefined && this.stats !== null);
                    },
                    getFeeText: function () {
                        var feeText = [];
                        if (this.stats.config.donation > 0)
                            feeText.push(this.stats.config.donation + '% to pool dev');
                        if (this.stats.config.coreDonation > 0)
                            feeText.push(this.stats.config.coreDonation + '% to core devs');
                        return feeText.join(', ');
                    },
                    getTotalFee: function () {
                        var totalFee = this.stats.config.fee;
                        if (this.stats.config.doDonations) {
                            totalFee += this.stats.config.donation;
                            totalFee += this.stats.config.coreDonation;
                        }
                        return Math.round(totalFee * 100) / 100;
                    },
                    getBlocksFound: function () {
                        return this.getReadableTime(this.stats.network.difficulty / this.stats.pool.hashrate);
                    }
                }
            });
            exports_1("default", Pool);
        }
    };
});
//# sourceMappingURL=pool.js.map