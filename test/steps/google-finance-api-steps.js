const { Given, When, Then } = require('cucumber');
const fetch = require("node-fetch");
const jsdom = require("jsdom");

Given('I GET data', async function () {
    // Specify the API endpoint
    const url = 'https://consent.google.com/save?gl=DE&m=0&app=0&pc=fgc&continue=https%3A%2F%2Fwww.google.com%2Ffinance%2Fquote%2FBTC-USD&x=6&bl=boq_identityfrontenduiserver_20240212.07_p1&hl=en-US&src=1&cm=2&set_eom=true';

    // Make a POST request using the Fetch API
    fetch(url, {method: 'POST'})
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(function (text) {
        // This is the HTML from our response as a text string
        //     console.log(text);
            const dom = new jsdom.JSDOM(text);
            const price = dom.window.document.querySelector("div[class='YMlKec fxKbKc']").textContent;
            console.log(price);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

async function fetchPostUrl(url) {
    try {
        let response = await fetch(url,{method: 'POST'}); // Gets a promise
        document.body.innerHTML = await response.text(); // Replaces body with response
    } catch (err) {
        console.log('Fetch error:' + err); // Error handling
    }
}

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
function stringToHTML(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body;

    // const dom = document.createElement('div');
    // dom.innerHTML = str;
    // return dom;
}
