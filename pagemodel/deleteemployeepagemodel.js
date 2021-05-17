const { BasePageModel } = require("./basepagemodel");
const { By } = require("selenium-webdriver");
const { timeout } = require("../tests/base-test");

const deleteButton = By.css("input[value='Delete']");

class DeleteEmployeePageModel extends BasePageModel {
    constructor(driver)
    {
        super(driver);
        this.driver = driver;
        this.timeout = timeout;
    }

    isPageLoaded = async () => {
        return await this.isElementDisplayed(deleteButton);
    }

    clickDeleteButton = async () => {
        return await this.clickElement(deleteButton);
    }
}

module.exports = { DeleteEmployeePageModel }