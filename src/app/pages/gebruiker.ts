import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import UserStats from "./../components/userstats"
import UserAbbr from "./../components/userabbr"

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {
        
        $txtAddress: JQuery
        // props
        users: [IUser]

        refreshUserData(): void
    }
}

const Gebruiker = Vue.extend({
    components: {
        'userstats': UserStats,
        'userabbr' : UserAbbr
    },
    template: `
    <div class="user card"">
        <div class="card-header">
            <h3>Gebruikers statistieken</h3>
            <span><i class="fa fa-user-circle fa-2x" aria-hidden="true"></i></span>
        </div>
        <div class="card-body">
            <div class="input-group searchmoneroaddress">
                <input class="form-control" type="text" placeholder="Monero adres" id="txtAddress">
                <span class="input-group-btn">
                    <button class="btn btn-primary" type="button" v-on:click="lookupAddress($event)">
                        <span><i class="fa fa-search"></i></span>
                        <span style="display: none;"><i class="fa fa-refresh fa-spin"></i> Zoeken...</span>
                    </button>
                </span>
            </div>
            <userabbr 
                :users="users"
                v-on:refreshall="refreshUserData"
            ></userabbr>
            <userstats 
                v-for="user in users" 
                :user="user" 
                :key="user.xmraddress"
                v-on:deleteUserData="deleteUserData"
            ></userstats>
        </div>
    </div>`,
    computed: Vuex.mapState({
        users : state => (<IAppState>state).users,
    }),
    mounted(){
        this.$txtAddress = $(this.$el).find('#txtAddress');
    },
    created(){
        this.refreshUserData();
    },
    watch : {
        '$route'(to: VueRouter.Route, from: VueRouter.Route) {
            this.refreshUserData();
        },
    },
    methods : {
        showMe(){
            return this.ready(this.users);
        },
        ready(variable: any){
            return (variable !== undefined && variable !== null);
        },
        lookupAddress(ev: Event){
            ev.preventDefault();
            this.requestUserData(this.$txtAddress.val());
            this.$txtAddress.val('');
        },
        requestUserData(xmraddress: string){
            
            let params = {
                force: true,
                xmraddress : xmraddress
            }
            this.$store.dispatch('getUserData', params);
        },
        refreshUserData(){
            this.users.forEach((user) => {
                this.requestUserData(user.xmraddress);
            });
        },
        deleteUserData(xmraddress: string){
            this.$store.dispatch('deleteUserData', xmraddress);
        }
    }
});

export default Gebruiker;