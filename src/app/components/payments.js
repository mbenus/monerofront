System.register(["vue", "./../common/mixins"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vue_1, mixins_1, Payments;
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
            Payments = vue_1.default.extend({
                mixins: [mixins_1.formatdata],
                template: "\n        <div class=\"payments\">\n            <h4>Payments</h4>\n            <div class=\"table-responsive\">\n                <table class=\"table table-striped\">\n                    <thead>\n                    <tr>\n                        <th><i class=\"fa fa-clock-o\"></i> Time Sent</th>\n                        <th><i class=\"fa fa-paw\"></i> Transaction Hash</th>\n                        <th><i class=\"fa fa-money\"></i> Amount</th>\n                        <th><i class=\"fa fa-money\"></i> Fee</th>\n                        <th><i class=\"fa fa-sitemap\"></i> Mixin</th>\n                        <th><i class=\"fa fa-address-book-o\"></i> Recipients</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                        <tr v-for=\"payment in payments\">\n                            <td>{{formatDate(payment.time)}}</td>\n                            <td v-html=\"formatPaymentLink(payment.hash)\"></td>\n                            <td>{{getReadableCoins(payment.amount, 4, true)}}</td>\n                            <td>{{getReadableCoins(payment.fee, 4, true)}}</td>\n                            <td>{{payment.mixin}}</td>\n                            <td>{{payment.recipients}}</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n            <p class=\"yourStats text-center\" style=\"display: block;\">\n                <button type=\"button\" class=\"btn btn-default\" id=\"loadMorePayments\">Load More</button>\n            </p>\n        </div>\n        ",
                props: ['rawpayments2'],
                computed: {
                    payments: function () {
                        var payments = [];
                        for (var i = 0; i < this.rawpayments.length; i += 2) {
                            var payment = this.parsePayment(this.rawpayments[i + 1], this.rawpayments[i]);
                            payments.push(payment);
                        }
                        return payments;
                    },
                    rawpayments: function () {
                        return [
                            "cd1afe3c63d83c7e4926d5290d18dc6932b468e63cc9a44659dd0cf87817ebfd:500000000000:10000000000:4",
                            "1505779846",
                            "43b86b4efa91e159f133d5b117f33954e5e77f36c5b2507dad6eed6f098098a6:500000000000:10000000000:4",
                            "1504484273",
                            "dfa4a7b041e28e489a6a9458da13af9060ae57e4dcc84bbab6995851f6c3d8c5:500000000000:10000000000:4",
                            "1503274838",
                            "d46d0325f652fee0e5f7940b7e2594b8015cfcdc0fe9d4e430dfd61ede2e0e99:500000000000:10000000000:4",
                            "1502496879",
                            "360610edd509b7d366b818693daba3173bfe643801805faeccb92228dd846d15:500000000000:10000000000:4",
                            "1501632564"
                        ];
                    }
                },
                methods: {
                    showMe: function () {
                        return (this.rawpayments !== undefined && this.rawpayments !== null);
                    },
                    parsePayment: function (time, rawpayment) {
                        var parts = rawpayment.split(':');
                        var payment = {
                            time: parseInt(time),
                            hash: parts[0],
                            amount: parts[1],
                            fee: parts[2],
                            mixin: parts[3],
                            recipients: parts[4]
                        };
                        return payment;
                    }
                }
            });
            exports_1("default", Payments);
        }
    };
});
//# sourceMappingURL=payments.js.map