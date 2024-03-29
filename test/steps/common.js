const { Given, When} = require('cucumber')

Given('I navigate to the {string} page', async function (pageName) {
    this.page = this.pageFactory.create(pageName);
    await this.helper.loadPage(this.appUrl+this.page.url, 30);
});

Given('I see title {string}', async function (expectedTitle) {
    await this.page.titleEquals(expectedTitle);
});

When('I reload|refresh page', async function () {
	await this.helper.refresh();
});