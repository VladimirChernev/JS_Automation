const { Before, After, Status, AfterAll } = require('cucumber');
const _ = require('lodash');
const sanitize = require('sanitize-filename');
const Report = require('./Report');
const Driver = require("./Driver");

// Before hooks run before the first step of each scenario.
// Only use a Before hook for low-level logic such as starting a browser or deleting data from a database.
// Hooks can be conditionally selected for execution based on the tags of the scenario.
Before({tags: '@ui'}, async function () {
    if(this.debug) console.log("Before hook: starting driver");
    // start browser driver instance if UI test
    this.driver = Driver.create(this.pf).build();
    // maximize driver instance
    await this.driver.manage().window().maximize();
});

// After hooks run after the last step of each scenario, even when steps are failed, undefined, pending, or skipped.
// The scenario parameter is optional, but if you use it, you can inspect the status of the scenario.
// Hooks can be conditionally selected for execution based on the tags of the scenario.
After({tags: '@ui'}, async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        try{
            if(this.debug) console.log('After Hook: '+scenario.result.status);

            // Taking screenshot
            await this.screenshot.create(sanitize(_.toLower(scenario.pickle.name) + ".png").replace(/ /g, "_"));
        } catch (e) {
            console.error(e);
        }
    }

    if(this.isBrowser){
        if(this.debug) console.log('After Hook: '+this.isBrowser);

        await this.sleep(500);
        await this.driver.quit();
    }
});

// Defines a hook which is run after all scenarios have completed.
// Multiple After All hooks are executed in the reverse order that they are defined.
AfterAll(async function () {
    console.log("Execute after all hook.");

    setTimeout(() => {
        Report.generate();
    }, 1000)
});