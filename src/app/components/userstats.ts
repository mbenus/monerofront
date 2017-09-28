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
    <div class="userstats" v-if="showMe()">
        <div>
            <i class="fa fa-key"></i>
            Address: 
            <span>{{user.xmraddress}}</span>
            <button class="btn btn-danger" type="button" v-on:click="deleteAddress($event)">
                <span><i class="fa fa-trash"></i>Remove</span>
            </button>
        </div>
        <div>
            <i class="fa fa-bank"></i> 
            Pending Balance: 
            <span>{{getReadableCoins(userstats.balance)}}</span>
        </div>
        <div>
            <i class="fa fa-money"></i>
            Total Paid:
            <span>{{getReadableCoins(userstats.paid)}}</span>
        </div>
        <div>
            <i class="fa fa-clock-o"></i>
            Last Share Submitted: 
            <span>{{formatTimestamp(userstats.lastShare)}}</span>
        </div>
        <div>
            <i class="fa fa-tachometer"></i> 
            Hash Rate: 
            <span>{{displayHashrate(userstats.hashrate)}}</span>
        </div>
        <div>
            <i class="fa fa-cloud-upload"></i> 
            Total Hashes Submitted: 
            <span>{{userstats.hashes}}</span>
        </div>
        <payments :rawpayments2="user.userstats.payments"></payments>
    </div>`,
    props : ['user'],
    computed: {
        userstats: function () {

            let dat: IUserStat = {
                balance : 0,
                hashes : 0,
                hashrate: "0",
                paid: 0,
                lastShare: 0
            };

            const stats =  this.user.userstats.stats;
            if (stats){
                dat.balance = stats.balance || 0;
                dat.hashes = stats.hashes || 0;
                dat.hashrate = stats.hashrate || "0";
                dat.paid = stats.paid || 0;
                dat.lastShare = stats.lastShare || 0;
            }
            return dat;
        }
    },
    methods : {
        showMe(){
            return (this.user !== undefined && this.user !== null && this.user.userstats !== null);
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