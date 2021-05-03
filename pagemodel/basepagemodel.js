const { promisify, debuglog } = require('util')
const sleep = promisify(setTimeout)
const { until, Builder } = require('selenium-webdriver')
const chrome = require('chromedriver')
const { baseUrl, timeout } = require("../tests/base-test")
const { debug } = require('console')

class BasePageModel {

    constructor(driver, timeout)
    {
        this.driver = driver;
        this.timeout = timeout;
    }

    navigateToLoginPage = async () => {
        await this.driver.manage().window().maximize();
        await this.driver.get(baseUrl);
    }

    enterText = async (selector, value) => {
        await this.driver.wait(until.elementLocated(selector), this.timeout);
        await this.driver.findElement(selector).then(el => {
            el.sendKeys(value);
        });
    }

    clickElement = async (selector) => {
        await this.driver.wait(until.elementLocated(selector), this.timeout);
        let input = await this.driver.findElement(selector);
        await input.click();
    }

    waitInMilliSeconds = async (t) => {
        await sleep(t);
    }

    isElementDisplayed = async (selector) =>
    {
        await this.driver.wait(until.elementIsVisible(this.driver.findElement(selector)), this.timeout);
        let isDisplayed = await this.driver.findElement(selector).then(el => {
            return el.isDisplayed();
        });
        return isDisplayed;
    }
}

module.exports = { BasePageModel };