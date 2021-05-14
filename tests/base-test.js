const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const driver = getWebDriver();

const timeout = 10000;

const baseUrl = "http://magenicautomation.azurewebsites.net/Static/Training2/loginpage.html";

function getWebDriver() {
    return new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
}

module.exports = { driver, timeout, baseUrl };
