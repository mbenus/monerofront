import Vue from 'vue'
import { formatdata } from "./../common/mixins"

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {
        //data properties
        rawpayments: string[],
        payments: Payment[]
        // computed properties

        // methods
        parsePayment(time: string, rawpayment: string) : Payment
    }
}

const Payments = Vue.extend({
    mixins: [formatdata],
    template: `
        <div class="payments">
            <h4>Payments</h4>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th><i class="fa fa-clock-o"></i> Time Sent</th>
                        <th><i class="fa fa-paw"></i> Transaction Hash</th>
                        <th><i class="fa fa-money"></i> Amount</th>
                        <th><i class="fa fa-money"></i> Fee</th>
                        <th><i class="fa fa-sitemap"></i> Mixin</th>
                        <th><i class="fa fa-address-book-o"></i> Recipients</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="payment in payments">
                            <td>{{formatDate(payment.time)}}</td>
                            <td v-html="formatPaymentLink(payment.hash)"></td>
                            <td>{{getReadableCoins(payment.amount, 4, true)}}</td>
                            <td>{{getReadableCoins(payment.fee, 4, true)}}</td>
                            <td>{{payment.mixin}}</td>
                            <td>{{payment.recipients}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="yourStats text-center" style="display: block;">
                <button type="button" class="btn btn-default" id="loadMorePayments">Load More</button>
            </p>
        </div>
        `,
    props : ['rawpayments2'],
    computed : {
        payments(){
            var payments : Payment[] = [];
            for (var i=0; i< this.rawpayments.length; i+=2){
                var payment = this.parsePayment(this.rawpayments[i + 1], this.rawpayments[i]);
                payments.push(payment);
            }
            return payments;
        },
        rawpayments(){ // dummy/testdata zoals deze wordt teruggegeven door de backend
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
              ]
        }
    },
    methods : {
        showMe(){
            return (this.rawpayments !== undefined && this.rawpayments !== null);
        },
        parsePayment(time: string, rawpayment){
            // terribly uggly!!!!
            var parts = rawpayment.split(':');
            var payment : Payment = {
                time: parseInt(time),
                hash: parts[0],
                amount: parts[1],
                fee: parts[2],
                mixin: parts[3],
                recipients: parts[4]
            }
            return payment;
        }
    
    }
});
    
export default Payments;