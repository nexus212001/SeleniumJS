const { BasePageModel } = require("./basepagemodel");
const { By } = require('selenium-webdriver');
const { timeout } = require("../tests/base-test");
let homeTabSelector = By.css('#Home');

class HomePageModel extends BasePageModel {

    constructor(driver)
    {
        super(driver);
        this.driver = driver;
        this.timeout = timeout;
    }

    isPageLoaded = async () =>
    {
        return await this.isElementDisplayed(homeTabSelector);
    }
}

module.exports = { HomePageModel };