import Vue from 'vue'
import { formatdata } from "./../common/mixins"

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {
        //data properties
        coinUnits: number
        
        // computed properties
        stats: any

        // methods 
        getReadableTime(time : number)
    }
}

const Pool = Vue.extend({
    mixins: [formatdata],
    template: `
    <div class="network" v-if="showMe()">
        <h3>Our Pool</h3>
        <div>
            <i class="fa fa-tachometer"></i>
            Hash Rate: 
            <span>{{getReadableHashRateString(stats.pool.hashrate * 120)}}</span>
        </div>
        <div>
            <i class="fa fa-clock-o"></i>
            Block Found:
            <span>{{formatTimestamp(stats.pool.lastBlockFound)}}</span>
        </div>
        <div>
            <i class="fa fa-users"></i>
            Connected Miners:
            <span>{{stats.pool.miners}}</span></div>
        <div>
            <i class="fa fa-gift"></i>
            Donations:
            <span>{{getFeeText()}}</span>
        </div>
        <div>
            <i class="fa fa-money"></i>
            Total Pool Fee:
            <span>{{getTotalFee()}}</span>
        </div>
        <div>
            <i class="fa fa-history"></i>
            Block Found Every:
            <span>{{getBlocksFound()}}</span> (est.)
        </div>
    </div>`,
    props : ['stats'],
    methods : {
        showMe(){
            return (this.stats !== undefined && this.stats !== null);
        },
        getFeeText(){
            let feeText = [];
            if (this.stats.config.donation > 0) feeText.push(this.stats.config.donation + '% to pool dev');
            if (this.stats.config.coreDonation > 0) feeText.push(this.stats.config.coreDonation + '% to core devs');
            return  feeText.join(', ');
        },
        getTotalFee(){
            let totalFee = this.stats.config.fee;
            if (this.stats.config.doDonations){
                totalFee += this.stats.config.donation;
                totalFee += this.stats.config.coreDonation;
            }
            return Math.round(totalFee * 100) / 100;
        },
        getBlocksFound(){
            return this.getReadableTime(this.stats.network.difficulty / this.stats.pool.hashrate);
        }
    }
});

export default Pool;