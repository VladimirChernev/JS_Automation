const { Given, When, Then } = require('cucumber');
const fetch = require("node-fetch");

Given('I GET data', async function () {
    // Specify the API endpoint
    const apiUrl = 'https://www.google.com/finance/quote/BTC-USD';

    // Make a GET request using the Fetch API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // return response.json();
            return response.body;
        })
        .then(response => {
            // Process the retrieved user data
            console.log('Response: ', response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
