import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import moment from "moment";

// No typings...
declare var d3 :any;
declare var nv :any;

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {

        // computed properties
        priceData: IMoneroPriceState;

        // methods
        drawChart(): void;
        refreshPriceData(): void;
    }
}

const Koers = Vue.extend({
    template: `
    <div class="koers card"">
        <div class="card-header">
            <h3>Prijs Monero 
                <span v-if="latestRecord">€{{formatNumber(latestRecord.y)}}</span>
            </h3>
            <span v-if="latestRecord">({{formatDate(latestRecord.x)}})</span>
            <span><i class="fa fa-line-chart fa-2x" aria-hidden="true"></i></span>
        </div>  
        <div class="card-body">
            <div class="svg-container" id="moneroprijs">
                <svg></svg>
            </div>
        </div>
    </div>`,
    computed: Vuex.mapState({
        priceData: state => (<IAppState>state).priceData,
        latestRecord(state: IAppState){
            if (state.priceData && state.priceData.data && state.priceData.data.length){
                return state.priceData.data[state.priceData.data.length -1];
            }
        }
    }),
    created(){
        this.refreshPriceData();
    },
    watch : {
        '$route'(to: VueRouter.Route, from: VueRouter.Route) {
            this.refreshPriceData();
        },
        'priceData.data'(to : IMoneroPrice[], from: IMoneroPrice[]){
            this.drawChart();
        }
    },
    methods : {
        refreshPriceData(){
            this.$store.dispatch('getPriceData');
        },
        formatDate(timestamp){
            if (!timestamp){
                return '';
            }
            return moment(new Date(timestamp*1000)).format('D MMM YYYY HH:mm');
        },
        formatNumber(nr: Number){
            return nr.toFixed(2);
        },
        drawChart(){
            const data = this.priceData.data;

            const serie = {
                values : data,
                key: 'Xmr',
                color: '#7777ff',
            }
            const series = [serie];

            nv.addGraph(function() {

                var chart = nv.models.lineWithFocusChart();
                chart.xAxis
                  .showMaxMin(false)
                  .tickPadding(10)
                  //.tickFormat(function (d) { return d3.time.format('%a %H:%M')(new Date(d*1000)) });
                  .tickFormat(function (d) { return moment(new Date(d*1000)).format('ddd HH:mm'); });
              
                chart.x2Axis
                .showMaxMin(true)
                  .tickPadding(20)
                  .tickFormat(function (d) { return moment(new Date(d*1000)).format('dddd'); });

                chart.yAxis
                  .tickFormat(function(t){
                      return '€' + d3.format(',.2f')(t);
                      
                  });
              
                //chart.y2Axis
                //.tickFormat(d3.format(',.2f'));
            
                d3.select('#moneroprijs svg')
                  .datum(series)
                  .transition().duration(500)
                  .call(chart)
                  ;
              
                nv.utils.windowResize(chart.update);
              
                return chart;
              });

        }
    }
});

export default Koers;