const Page = require('./Page');

/**
 * Google Finance Page Class Methods
 */
class GoogleFinancePage extends Page {
    /**
     * Get page specific url to navigate
     * @returns {String} page url
     */
    get url() {
        return '/finance/quote/BTC-USD';
    }

    /**
     * Get page elements
     * @returns {Object} page elements
     */
    get elements() {
        return {
            rejectAllButton: "button[jsname='tWT92d']",
            btcToUsdBanner: "div[class='YMlKec fxKbKc']"
        };
    }

    /**
     * Click on Reject all cookies button and wait for the body element to be present
     */
    async clickRejectAllButton() {
        if(this.world.debug) console.log('clickRejectAllButton');

        const rejectAll = this.elements.rejectAllButton;

        await this.world.helper.waitFor(rejectAll, 30);
        const el = await this.world.helper.findElement(rejectAll);
        await el.click();

        // now wait for the body element to be present
        await this.world.helper.waitFor('body', 30);
    }

    /**
     * Monitor BTC to USD exchange rate for period time and save values at every interval
     * @param {int} period - time in minutes to monitor
     * @param {int} interval - time in seconds between recording a new value
     */
    async monitorBtcToUsdExchangeRate(period, interval) {
        if(this.world.debug) console.log('monitorBtcToUsdExchangeRate');

        const btcToUsd = this.elements.btcToUsdBanner;
        await this.world.helper.waitFor(btcToUsd, 30);
        const el = await this.world.helper.findElement(btcToUsd);

        // collect all values for the required period from the ui element:
        const collected_values = []
        for (let step = 0; step < Math.abs(period * 60 / interval) + 1; step++) {
            collected_values.push(await el.getText())
            await this.world.sleep(Math.abs(interval * 1000));
        }

        // convert the collected values from string to float, remove comma and save them for later use:
        for (let value of collected_values) {
            this.world.monitor_values.push(parseFloat(value.replace(/,/g, '')))
        }

        if(this.world.debug) console.log("Collected values: " + this.world.monitor_values);
    }

    /**
     * Evaluate difference between initial value and final value is not greater than N percent
     * @param {int} percent - max allowed difference in percentage between monitored values
     */
    async checkOverallDifference(percent) {
        if(this.world.debug) console.log('checkOverallDifference');

        // get first value
        const initialValue = this.world.monitor_values.at(0)
        // get last value
        const finalValue = this.world.monitor_values.at(this.world.monitor_values.length - 1)
        // calculate percentage difference
        const percentageDiff = this.world.helper.calculatePercentageDifference(initialValue, finalValue)

        if(this.world.debug) console.log('initial value: ' + initialValue);
        if(this.world.debug) console.log('final value: ' + finalValue);
        if(this.world.debug) console.log('Calculated Diff: ' + percentageDiff);
        this.world.expect(percentageDiff).to.lessThan(percent)
    }

    /**
     * Evaluate difference between each interval values is not greater than N percent
     * @param {int} percent - max allowed difference in percentage between monitored values
     */
    async checkIntervalsDifference(percent) {
        if(this.world.debug) console.log('checkIntervalsDifference');

        // get the highest number
        const highestNumber = Math.max(...this.world.monitor_values);
        // get the lowest number
        const lowestNumber = Math.min(...this.world.monitor_values);
        // calculate percentage difference
        const percentageDiff = this.world.helper.calculatePercentageDifference(highestNumber, lowestNumber)

        if(this.world.debug) console.log('highest number: ' + highestNumber);
        if(this.world.debug) console.log('lowest number: ' + lowestNumber);
        if(this.world.debug) console.log('Calculated Diff: ' + percentageDiff);
        this.world.expect(percentageDiff).to.lessThan(percent)
    }

    /**
     * Monitor BTC to USD exchange rate for period time and save values at every interval
     * @param {int} period - time in minutes to monitor
     * @param {int} interval - time in seconds between recording a new value
     */
    async monitorBtcToUsdExchangeRateApi(period, interval) {
        if(this.world.debug) console.log('monitorBtcToUsdExchangeRate');

        // Specify the API endpoint
        const api_url = 'https://consent.google.com/save?gl=DE&m=0&app=0&pc=fgc&continue=https%3A%2F%2Fwww.google.com%2Ffinance%2Fquote%2FBTC-USD&x=6&bl=boq_identityfrontenduiserver_20240212.07_p1&hl=en-US&src=1&cm=2&set_eom=true';


        // collect all values for the required period from the ui element:
        const collected_values = []
        for (let step = 0; step < Math.abs(period * 60 / interval) + 1; step++) {
            collected_values.push(await this.world.getBtcToUsdPrice(api_url))
            await this.world.sleep(Math.abs(interval * 1000));
        }

        // convert the collected values from string to float, remove comma and save them for later use:
        for (let value of collected_values) {
            this.world.monitor_values.push(parseFloat(value.replace(/,/g, '')))
        }

        if(this.world.debug) console.log("Collected values: " + this.world.monitor_values);
    }

}

module.exports = GoogleFinancePage;