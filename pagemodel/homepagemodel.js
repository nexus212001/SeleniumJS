const { BasePageModel } = require("./basepagemodel");
const { By } = require('selenium-webdriver');

let homeTabSelector = By.css('#Home');

class HomePageModel extends BasePageModel {

    constructor(driver, timeout)
    {
        super(driver, timeout);
        this.driver = driver;
        this.timeout = timeout;
    }

    isPageLoaded = async () =>
    {
        return await this.isElementDisplayed(homeTabSelector);
    }
}

module.exports = { HomePageModel };