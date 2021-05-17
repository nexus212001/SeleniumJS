const { promisify, debuglog } = require('util');
const sleep = promisify(setTimeout);
const { until, Builder, By } = require('selenium-webdriver');
const chrome = require('chromedriver');
const { timeout } = require("../tests/base-test");

class BasePageModel {

    constructor(driver)
    {
        this.driver = driver;
        this.timeout = timeout;
    }

    navigateToUrl = async (url) => {
        await this.driver.manage().window().maximize();
        await this.driver.get(url);
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

    isElementDisplayed = async (selector) =>
    {
        await this.driver.wait(until.elementIsVisible(this.driver.findElement(selector)), this.timeout);
        let isDisplayed = await this.driver.findElement(selector).then(el => {
            return el.isDisplayed();
        });
        return isDisplayed;
    }

    selectRandomFromDropdown = async (selector) => {
        await this.driver.wait(until.elementIsVisible(this.driver.findElement(selector)), this.timeout);
        let options = await this.driver.findElement(selector).then(async (el) => {
            return await el.findElements(By.css("option"));
        });
        let selected = options[Math.floor(Math.random() * options.length)];
        await selected.click();
        return await selected.getText();
    }
}

module.exports = { BasePageModel };