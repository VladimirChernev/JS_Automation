const { Given, When, Then } = require('cucumber');

Given('I click reject all cookies button', async function () {
    await this.page.clickRejectAllButton();
});

When('I monitor BTC to USD exchange rate for {int} minutes every {int} seconds', {timeout: 600 * 1000}, async function (period, interval) {
    await this.page.monitorBtcToUsdExchangeRateUi(period, interval);
});

Then('I check overall difference is not greater than {int} percent', async function (percent) {
    await this.page.checkOverallDifference(percent);
});

Then('I check difference in interval values is not greater than {int} percent', async function (percent) {
    await this.page.checkIntervalsDifference(percent);
});

Given('I monitor BTC to USD exchange rate using API for {int} minutes every {int} seconds', {timeout: 600 * 1000}, async function (period, interval) {
    this.page = this.pageFactory.create("google finance");
    await this.page.monitorBtcToUsdExchangeRateApi(period, interval)
});
