import Vue from 'vue'
import _ from "lodash";

import helper from './../common/helper'

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {
        //data properties
        
        // computed properties
        users: [IUser]

        // methods 
    }
}

const UserAbbr = Vue.extend({
    template: `
    <div class="userabbr alert alert-success" role="alert" v-if="showMe()">
        <div>
            Totaal:
            <span class="button" v-on:click="refresh($event)"><i class="fa fa-refresh" aria-hidden="true"></i></span>
        </div>
        <div class="xmrdetails">
            <div>
                <i class="fa fa-paw"></i> 
                Aantal Monero adressen: 
                <span>{{this.users.length}}</span>
            </div>
            <div>
                <i class="fa fa-bank"></i> 
                Te ontvangen Monero: 
                <span>{{getTotalPendingBalance(users)}}</span>
            </div>
            <div>
                <i class="fa fa-money"></i>
                Monero Uitbetaald:
                <span>{{getTotalBalance(users)}}</span>
            </div>
            <div>
                <i class="fa fa-tachometer"></i> 
                Hash Rate: 
                <span>{{displayHashrate(users)}}</span>
            </div>
        </div>
    </div>`,
    props : ['users'],
    methods : {
        showMe(){
            // only display if more than one user/xmraddress
            return (this.users !== undefined && this.users !== null && this.users.length > 1);
        },
        refresh(ev: Event){
            ev.preventDefault();
            this.$emit('refreshall');
        },
        getTotalPendingBalance(users: [IUser]){
            var balances = _.map(users, (user) => {
                return user.userstats.stats.balance;
            });
            return _.reduce(balances, (sum, n) => {
                return sum + n;
            });
        },
        getTotalBalance(users: [IUser]){
            var paids = _.map(users, (user) => {
                return user.userstats.stats.paid;
            });
            return _.reduce(paids, (sum, n) => {
                return sum + n;
            });
        },
        displayHashrate(users: [IUser]){

            var hashrates = _.map(users, (user)=>{
                return user.userstats.stats.hashrate;
            });
            
            // this shouldnt be necessary... backend should return hashrate without the unit
            let totalHashrate = 0;
            hashrates.forEach((strhashrate) => {

                const splittedHashrate = strhashrate.split(' ');
                const unit = splittedHashrate[1];
                const hashrate = parseFloat(splittedHashrate[0]);
                switch (unit){
                    case 'H':
                        totalHashrate += hashrate;
                        break;
                    case 'KH':
                        totalHashrate += hashrate * 1000;
                        break;
                    case 'MH':
                        totalHashrate += hashrate * 1000000;
                        break;
                    case 'GH':
                        totalHashrate += hashrate * 1000000000;
                        break;
                    case 'TH':
                        totalHashrate += hashrate * 1000000000000;
                        break;
                    case 'PH':
                        totalHashrate += hashrate * 1000000000000000;
                        break;
                    default:
                        console.log('unknown hashrate unit: ' + unit);
                }
            });
            return helper.getReadableHashRateString(totalHashrate * 120);
        }
    }
});

export default UserAbbr;