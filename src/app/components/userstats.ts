import Vue from 'vue'
import { formatdata } from "./../common/mixins"
import Payments from "./payments"

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {
        //data properties
        
        // computed properties
        user: IUser

        // methods 
    }
}

const UserStats = Vue.extend({
    components: {
        'payments': Payments
    },
    mixins: [formatdata],
    template: `
    <div class="stats" v-if="showMe()">
        <div class="yourStats" style="display: block;">
            <i class="fa fa-key"></i>
            Address: 
            <span id="yourAddressDisplay">{{user.xmraddress}}</span>
            <button class="btn btn-danger" type="button" v-on:click="deleteAddress($event)">
                <span style="display: inline;"><i class="fa fa-trash"></i>Remove</span>
            </button>
        </div>
        <div>
            <i class="fa fa-bank"></i> 
            Pending Balance: 
            <span id="yourPendingBalance">{{getReadableCoins(user.userstats.balnce)}}</span>
        </div>
        <div>
            <i class="fa fa-money"></i>
            Total Paid:
            <span id="yourPaid">{{getReadableCoins(user.userstats.stats.paid)}}</span>
        </div>
        <div>
            <i class="fa fa-clock-o"></i>
            Last Share Submitted: 
            <span id="yourLastShare">{{formatTimestamp(user.userstats.stats.lastShare)}}</span>
        </div>
        <div>
            <i class="fa fa-tachometer"></i> 
            Hash Rate: 
            <span id="yourHashrateHolder">{{displayHashrate(user.userstats.stats.hashrate)}}</span>
        </div>
        <div>
            <i class="fa fa-cloud-upload"></i> 
            Total Hashes Submitted: 
            <span id="yourHashes">{{user.userstats.stats.hashes}}</span>
        </div>
        <payments :rawpayments2="user.userstats.payments"></payments>
    </div>`,
    props : ['user'],
    methods : {
        showMe(){
            return (this.user !== undefined && this.user !== null);
        },
        deleteAddress(ev: Event){
            ev.preventDefault();
            this.$emit('deleteUserData', this.user.xmraddress);
        },
        displayHashrate(hashrate: string){
            const t = (hashrate)?hashrate:'0 H';
            return t + '/sec';
        }
    }
});

export default UserStats;