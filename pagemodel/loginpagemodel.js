const { BasePageModel } = require("./basepagemodel");
const { By, until } = require('selenium-webdriver');
const { baseUrl, timeout } = require("../tests/base-test");

let usernameField = By.css('#UserName');
let passwordField = By.css('#Password');
let loginButton = By.css('#Login');

class LoginPageModel extends BasePageModel {
    
    constructor(driver)
    {
        super(driver);
        this.driver = driver;
        this.timeout = timeout;
    }

    openPage = async () => {
        await this.navigateToUrl(baseUrl);
    }

    enterCredentials = async (username, password) =>
    {
        await this.enterText(usernameField, username);
        await this.enterText(passwordField, password);
    }

    clickLoginButton = async () =>
    {
        await this.clickElement(loginButton);
    }

    isPageLoaded = async () =>
    {
        return await this.isElementDisplayed(usernameField);
    }
}

module.exports = { LoginPageModel };