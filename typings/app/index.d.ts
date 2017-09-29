interface IAppState {
    stats: Stats,
    live_stats: any;
    errorResponse : any,
    users: User[]
}

declare class Stats {
    config: object;
    network: object;
    pool: object;
    timestamp_received?: number;
}

interface IrequestParams{
    requestid: string,
    xmraddress? : string
}

interface IUser {
    xmraddress: string,
    userstats?: IUserStats
}

interface IUserStats {
    "stats" : IUserStat,
    "payments" : [string]
}

interface IUserStat {
    "hashes" : number,
    "lastShare" : number,
    "balance" : number,
    "paid" : number,
    "hashrate" : string
}

declare class User implements  IUser {
    xmraddress: string;
    userstats?:IUserStats
}

declare class Payment {
    time: number;
    hash: string;
    amount: number;
    fee: number;
    mixin: number;
    recipients: string; //?????
}
//
// import {LoDashStatic} from "../../node_modules/@types/lodash/index"
// declare var _: LoDashStatic;