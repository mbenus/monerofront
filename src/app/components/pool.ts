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
        showMe(): boolean
        getFeeText(): string
        getTotalFee(): string
        getBlocksFound(): string
        getReadableTime(time : number) : string
    }
}

const Pool = Vue.extend({
    mixins: [formatdata],
    template: `
    <div class="pool card" v-if="showMe()">
        <div class="card-header">
            <span><i class="fa fa-trophy" aria-hidden="true"></i></span>
            <h3>Our Pool</h3> 
            <span class="refresh button" v-on:click="refresh($event)"><i class="fa fa-refresh" aria-hidden="true"></i></span>
        </div>
        <div class="card-body">
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
        </div>
    </div>`,
    props : ['stats'],
    methods : {
        showMe(){
            return (this.stats !== undefined && this.stats !== null);
        },
        refresh(ev: Event){
            ev.preventDefault();
            this.$emit('refresh');
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