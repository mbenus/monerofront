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
    <div class="userstats alert alert-info" v-if="showMe()">
        <div class="xmraddress">
           {{user.xmraddress}}
           <span class="button" v-on:click="deleteAddress($event)"><i class="fa fa-trash" aria-hidden="true"></i></span>
        </div>
        <div class="xmrdetails">
            <div>
                <i class="fa fa-bank"></i> 
                Te ontvangen: 
                <span>{{getReadableCoins(user.userstats.stats.balance)}}</span>
            </div>
            <div>
                <i class="fa fa-money"></i>
                Uitbetaald:
                <span>{{getReadableCoins(user.userstats.stats.paid)}} in {{user.userstats.payments.length}} betalingen</span>
            </div>
            <div>
                <i class="fa fa-clock-o"></i>
                Laatste bijdrage: 
                <span>{{formatTimestamp(user.userstats.stats.lastShare)}}</span>
            </div>
            <div>
                <i class="fa fa-tachometer"></i> 
                Hash Rate: 
                <span>{{displayHashrate(user.userstats.stats.hashrate)}}</span>
            </div>
            <div>
                <i class="fa fa-cloud-upload"></i> 
                Aantal hashes: 
                <span>{{user.userstats.stats.hashes}}</span>
            </div>
          
        </div>
        <!--<payments :rawpayments2="user.userstats.payments"></payments>-->
    </div>`,
    props : ['user'],
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