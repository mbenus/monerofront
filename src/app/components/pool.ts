import Vue from 'vue'
import { formatdata } from "./../common/mixins"

import PoolBlocks from "./../components/poolblocks"

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
    components: {
        'poolblocks': PoolBlocks
    },
    template: `
    <div class="pool card" v-if="showMe()">
        <div class="card-header">
            <h3>Moneropoel.nl</h3>
            <span><i class="fa fa-trophy fa-2x" aria-hidden="true"></i></span>
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
                Block Gevonden:
                <span>{{formatTimestamp(stats.pool.lastBlockFound)}}</span>
            </div>
            <div>
                <i class="fa fa-users"></i>
                Aantal delvers:
                <span>{{stats.pool.miners}}</span></div>
            <div>
                <i class="fa fa-gift"></i>
                Donaties:
                <span>{{getFeeText()}}</span>
            </div>
            <div>
                <i class="fa fa-money"></i>
                Totale poel kosten:
                <span>{{getTotalFee()}}</span>
            </div>
            <div>
                <i class="fa fa-history"></i>
                Block gevonden om de:
                <span>{{getBlocksFound()}}</span> (est.)
            </div>
        </div>
        <poolblocks
            :networkheight="stats.network.height"
            :config="stats.config"
            :rawblocks="stats.pool.blocks"
        >
        </poolblocks>
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
            if (this.stats.config.donation > 0) feeText.push(this.stats.config.donation + '% naar poel ontwikkelaars');
            if (this.stats.config.coreDonation > 0) feeText.push(this.stats.config.coreDonation + '% naar monero ontwikkelaars');
            return  feeText.join(', ');
        },
        getTotalFee(){
            let totalFee = this.stats.config.fee;
            if (this.stats.config.doDonations){
                totalFee += this.stats.config.donation;
                totalFee += this.stats.config.coreDonation;
            }
            const fee =  Math.round(totalFee * 100) / 100;
            return fee + '%';
        },
        getBlocksFound(){
            return this.getReadableTime(this.stats.network.difficulty / this.stats.pool.hashrate);
        }
    }
});

export default Pool;