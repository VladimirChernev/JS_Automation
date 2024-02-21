# Javascript Automation


## Installation:

As we are using JavaScript so first please install <a href="http://nodejs.org">Node.js</a>.

### Setup:

Please clone this repo and run the following commands:

```
npm install
```

### Environment Variables:

- **ENVIRONMENT** - (string) test environment to target - `staging` or `prod`.
- **PLATFORM** - (string) browser name - `chrome` or `chromeHeadless`. Defaults to `chrome`
- **DEFAULT_TIMEOUT** - (int) timeout after milliseconds. Defaults to `60 sec`
- **DEBUG** - (bool) if you need to see the logs - `true` or `false`. Defaults to `false`


### Running Tests:

Environment variables are a big part of configuration how to run the tests

Examples:

```cmd
./node_modules/.bin/cucumber-js -p default -p html_report --tags "@btc"
```

or

```cmd
DEBUG=true ./node_modules/.bin/cucumber-js -p default -p html_report --tags "@btc"
```