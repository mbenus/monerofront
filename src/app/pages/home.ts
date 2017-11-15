import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'


declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {

        // computed properties
        refreshStats(): void
    }
}

const Home = Vue.extend({
    template: `
        <div class="card" v-if="showMe()">
            <div class="card-header">
                <h3>Welkom bij moneropoel.nl</h3>
                <span><i class="fa fa-home fa-2x" aria-hidden="true"></i></span>
            </div>
            <div class="card-body">
                <p>
                   <h3>Delven met Hollanders <i class="fa fa-smile-o" aria-hidden="true"></i></h3>
                </p>
                <img src="../img/logo.png" class="" alt="logo"/>
                <p>
                    </br>
                    De totale fee voor de miningpoel is {{getTotalFee()}}%.<br/>
                    Wanneer de hostinkosten eruit zijn, wordt een deel geschonken aan een goed doel.
                </p>
                <p>
                    Registreren is niet nodig
                </p>
            </div>
        </div>`,
    computed: Vuex.mapState({
        stats: state => (<IAppState>state).stats
    }),
    created(){
        this.refreshStats();
    },
    watch : {
        '$route'(to: VueRouter.Route, from: VueRouter.Route) {
            this.refreshStats();
        },
    },
    methods : {
        showMe(){
            return (this.stats !== undefined && this.stats !== null);
        },
        refreshStats(){
            this.$store.dispatch('getStats');
        },
        getTotalFee(){
            let totalFee = this.stats.config.fee;
            if (this.stats.config.doDonations){
                totalFee += this.stats.config.donation;
                totalFee += this.stats.config.coreDonation;
            }
            return Math.round(totalFee * 100) / 100;
        }
    }
});

export default Home;