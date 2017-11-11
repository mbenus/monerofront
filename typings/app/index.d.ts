interface IAppState {
    stats: Stats,
    live_stats: any;
    errorResponse : any,
    users: User[],
    priceData: IMoneroPriceState
}

declare class Stats {
    config: object;
    network: object;
    pool: object;
    timestamp_received?: number;
}

interface IMoneroPriceState{
    loading: Boolean,
    data: ITimeSerie[]
}

interface IMoneroPrice {
    "base": String;
    "price": Number;
    "changed": Number;
    "target": String;
    "created": Number;
    "volume": Number;
    "id": Number;
    "timestamp": Number;
}

interface ITimeSerie{
    "x": Number;
    "y": Number;
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

declare class Block {
    height: number;
    hash: string;
    time: number;
    difficulty: number;
    shares: number;
    orphaned: number;
    reward: number;
    maturity?: string;
    status?: string;
}


//
// import {LoDashStatic} from "../../node_modules/@types/lodash/index"
// declare var _: LoDashStatic;