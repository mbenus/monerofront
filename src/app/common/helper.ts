import moment from "moment";

export default {
    getReadableHashRateString(hashrate: number){
        hashrate /= 120;
        var i = 0;
        var byteUnits = [' H', ' KH', ' MH', ' GH', ' TH', ' PH' ];
        while (hashrate > 1000){
            hashrate /=  1000;
            i++;
        }
        return hashrate.toFixed(2) + byteUnits[i] + '/sec';
    },
    printDateTime(timestamp: number){
        if (timestamp === undefined || timestamp === null){
            return '';
        }
        return moment(timestamp).format('dddd DD MMMM YYYY, HH:mm:ss');
    }
}