const {setWorldConstructor} = require('cucumber');
const selenium = require('selenium-webdriver');
const {expect} = require('chai');
const _ = require('lodash');
const Promise = require('bluebird');
const Screenshot = require('./Screenshot');
const Helper = require('./Helper');
const PageFactory = require('../../resources/PageFactory');
const fetch = require("node-fetch");
const jsdom = require("jsdom");

//Use dotenv to read .env vars into Node
require('dotenv').config();

/**
 * Sharing code and Data between steps.
 * Using world we can add helper methods, or logging.
 */
class World {
    /**
     * Instantiate the object
     * @param {JSON} attach - attach anything
     * @param {Command} parameters - sets the parameters as command
     */
    constructor({attach, parameters}) {
        this.attach = attach; // attaching screenshots to report
        this.parameters = parameters;
        this.pf = process.env.PLATFORM || "chrome";
        this.env = process.env.ENVIRONMENT || "local";
        this.timeout = parseInt(process.env.DEFAULT_TIMEOUT) || 60000;
        this.debug = (process.env.DEBUG === "true") || false;

        this.selenium = selenium;
        this.expect = expect;
        // this.assert = assert;

        this.monitor_values = []

        this.screenshot = new Screenshot(this);

        this.helper = new Helper(this);
        this.pageFactory = new PageFactory(this);
    }
    
    get isBrowser() {
        return _.isFunction(this.driver.manage);
    }

    get appUrl() {
        return this.helper.getAppUrlForEnv(this.env);
    }

    /**
     * Sleep
     * @param {String} milliseconds - milliseconds
     * @returns {Promise} return promise
     */
    sleep(milliseconds){
        return Promise.delay(milliseconds);
    }

    /**
     * Make a POST request using fetch to url, extract data from specific element
     * @param  {string} url url to fetch data from
     // * @returns {string} return extracted string value
     */
    async getBtcToUsdPrice(url) {
        try {
            let response = await fetch(url,{method: 'POST'});
            const text = await response.text();
            return World.stringToHTML(text)
        } catch (err) {
            console.log('Fetch error:' + err); // Error handling
        }
    }

    /**
     * Convert string into HTML DOM nodes and extract data from specific DOM element
     * @param  {string} text html response body streamed as text
     * @return {string}   extracted data from DOM element
     */
    static stringToHTML(text) {
        const dom = new jsdom.JSDOM(text);
        return dom.window.document.querySelector("div[class='YMlKec fxKbKc']").textContent
    }
}

setWorldConstructor(World);