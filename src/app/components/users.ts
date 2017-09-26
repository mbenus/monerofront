import Vue from 'vue'
import UserStats from "./userstats"

declare module 'vue/types/vue' {
    // Declare augmentation for Vue
    interface Vue {
        //data properties
        $txtAddress: JQuery
        
        // computed properties
        users: [IUser]

        // methods 
        ready(variable:any): boolean
        requestUserData(xmraddress: string) : void
    }
}

const Users = Vue.extend({
    components: {
        'userstats': UserStats
    },
    template: `
    <div class="users">
        <div class="input-group">
            <input class="form-control" type="text" placeholder="Enter Your Address" id="txtAddress">
            <span class="input-group-btn">
                <button class="btn btn-default" type="button" v-on:click="lookupAddress($event)">
                    <span><i class="fa fa-search"></i>Lookup</span>
                    <span style="display: none;"><i class="fa fa-refresh fa-spin"></i> Searching...</span>
                </button>
            </span>
        </div>
        <div v-if="showMe()">
            <userstats 
                v-for="user in users" 
                :user="user" 
                :key="user.xmraddress"
                v-on:deleteUserData="deleteUserData"
            ></userstats>
        </div>
    </div>`,
    props : ['users'],
    mounted(){
        this.$txtAddress = $(this.$el).find('#txtAddress');
    },
    created(){
        if (this.ready(this.users)){
            this.users.forEach((user) => {
                // Request userdata
                this.requestUserData(user.xmraddress);
            });
        }
    },
    watch :{
        'users'(to: [User], from: [User]){
           
        }
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
        },
        deleteUserData(xmraddress: string){
            this.$emit('deleteUserData', xmraddress);
        },
        requestUserData(xmraddress: string){
            this.$emit('requestUserData', xmraddress);
        }
    }
});

export default Users;