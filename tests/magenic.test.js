const { timeout, driver } = require('./base-test');
const { LoginPageModel } = require('../pagemodel/loginpagemodel');
const { HomePageModel } = require("../pagemodel/homepagemodel");

describe('Test suite', () => {
    
    beforeAll(async () => {
        this.driver = driver;
        jest.setTimeout(timeout);
    });

    test('Test case name here', async () => {
        let loginPage = new LoginPageModel(this.driver);
        await loginPage.openPage();
        expect(await loginPage.isPageLoaded()).toBe(true);
        await loginPage.enterCredentials("Ted","123");
        await loginPage.clickLoginButton();
        let homePage = new HomePageModel(this.driver);
        expect(await homePage.isPageLoaded()).toBe(true);
    });
    
    afterAll(async () => {
        await this.driver.close();
    });
})