const { BasePageModel } = require("./basepagemodel");
const { By, until } = require('selenium-webdriver');

let usernameField = By.css('#UserName');
let passwordField = By.css('#Password');
let loginButton = By.css('#Login');

class LoginPageModel extends BasePageModel {
    
    constructor(driver, timeout)
    {
        super(driver, timeout);
        this.driver = driver;
        this.timeout = timeout;
    }

    openPage = async () => {
        await this.navigateToLoginPage();
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