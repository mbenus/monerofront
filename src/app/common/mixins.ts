const formatdata = {
    data() {
        return {
            // zijn dit geen settings?
            coinUnits : 1000000000000,
            symbol: "XMR",
            basehashUrl: 'https://chainradar.com/xmr/block/',
            transactionExplorer: "http://chainradar.com/xmr/transaction/",
            blockchainExplorer: "http://chainradar.com/xmr/block/"
        };
    },
    methods: {
        formatTimestamp(timestamp: number){
            if (timestamp === undefined || timestamp === null){
                return 'Never';
            }
            var date = new Date(timestamp * 1000).toISOString();
            return $.timeago(date);
        },
        formatDate(time){
            if (!time) return '';
            return new Date(parseInt(time) * 1000).toLocaleString();
        },
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
        getReadableTime(seconds){
            
            var units = [ [60, 'second'], [60, 'minute'], [24, 'hour'],
                [7, 'day'], [4, 'week'], [12, 'month'], [1, 'year'] ];
    
            function formatAmounts(amount, unit){
                var rounded = Math.round(amount);
                return '' + rounded + ' ' + unit + (rounded > 1 ? 's' : '');
            }
    
            var amount = seconds;
            for (var i = 0; i < units.length; i++){
                if (amount < units[i][0])
                    return this.formatAmounts(amount, units[i][1]);
                amount = amount / <number>units[i][0]; //TODO: unit array typesafe maken
            }
            return this.formatAmounts(amount,  units[units.length - 1][1]);
        },
         formatPaymentLink(hash){
            return '<a target="_blank" href="' + this.transactionExplorer + hash + '">' + this.getBlockLink(hash) + '</a>';
        },
        formatAmounts(amount, unit){
            var rounded = Math.round(amount);
            return '' + rounded + ' ' + unit + (rounded > 1 ? 's' : '');
        },
        getReadableCoins(coins, digits, withoutSymbol){
            var amount = (parseInt(coins || 0) / this.coinUnits).toFixed(digits || this.coinUnits.toString().length - 1);
            return amount + (withoutSymbol ? '' : (' ' + this.symbol));
        },
        getBlockHref(hash: string) {
            return this.basehashUrl + hash;
        },
        getBlockLink(hash : string){
            return hash.substr(0, 13) + '...';
        }
    }
}

export { formatdata };
