
/**
 * Helper Related Methods
 */
class Helper {

    /**
     * Instantiate the object
     * @param {World} world - world object instance
     */
    constructor(world) {
        this.world = world;

        if(this.world.debug) console.log('Screenshot:constructor');
    }

    /**
     * Get app url for environment
     * @param  {String} env - Environment
     * @return {String} root url
     */
    getAppUrlForEnv(env) {
        switch (env.toLowerCase()) {
            case 'staging':
                return "https://www.google.com";
            case 'prod':
                return "https://www.google.com";
            default:
                return "https://www.google.com";
        }
    }

    /**
     * Evaluate difference between each interval values is not greater than N percent
     * @param {int} a - first number to be compared
     * @param {int} b - second number to be compared
     * @return {any} calculated percentage difference between the input numbers
     */
    calculatePercentageDifference(a, b) {
        // Calculate Percentage Difference. Formula from https://www.mathsisfun.com/percentage-difference.html
        return 100 * Math.abs( (a - b) / ( (a + b) /2 ) );
    }

    /**
     * Load or navigate to a page with the url and check the body element is present
     * @param {string} url - url to load
     * @param {int} waitInSeconds - number of seconds to wait for page to load
     * @example
     *      helper.loadPage('http://www.google.com');
     */
    async loadPage(url, waitInSeconds) {
        await this.world.driver.get(url);

        if(this.world.debug) console.log('loadPage: '+url);

        // now wait for the body element to be present
        await this.waitFor('body', waitInSeconds);
    }

    /**
     * Wait for any element to be found
     * @param {string} locator - css or xpath selector element
     * @param {number} waitInSeconds - number of seconds to wait for the element to load
     * @example
     *      helper.waitFor('body', 15);
     */
    async waitFor(locator, waitInSeconds) {

        // use either passed in timeout or global default
        const timeout = (waitInSeconds) ? (waitInSeconds * 1000) : this.world.defaultTimeout;

        if (!this.world.isBrowser) {
			throw new Error('Tests are not running on a web browser, no web elements to wait for');
        }
        
        const selector = (locator.indexOf('//') === 0) ? "xpath" : "css";

        if(this.world.debug) console.log('waitFor: '+locator);

        await this.world.driver.wait(this.world.selenium.until.elementLocated(this.world.selenium.By[selector](locator)), timeout);
    }

    /**
     * To find an element on the page
     * @param {string} locator - css or xpath selector element
     * @returns {WebElementPromise} an element that can be used to issue commands against the located element
     * @example
     *      helper.findElement('body');
     */
    async findElement(locator) {

        if (!this.world.isBrowser) {
			throw new Error('Tests are not running on a web browser, no web elements to wait for');
        }
        
        const selector = (locator.indexOf('//') === 0) ? "xpath" : "css";

        if(this.world.debug) console.log('findElement: '+locator);

        return this.world.driver.findElement(this.world.selenium.By[selector](locator));
    }

    /**
     * Reload or refresh page
     * @example
     *      helper.refresh();
     */
    async refresh() {
        if(this.world.debug) console.log('refresh');

        await this.world.driver.navigate().refresh();
        await this.world.sleep(2000);
    }
}

module.exports = Helper;