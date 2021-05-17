const { BasePageModel } = require("./basepagemodel");
const { timeout } = require('../tests/base-test');
const { By } = require("selenium-webdriver");
const { DataEntryHelper } = require("../util/dataentryhelper");
const { EmployeePageModel } = require("./employeepagemodel");

const createButton = By.css("input[value='Create']");
const firstNameField = By.css("#EmpFirstName");
const lastNameField = By.css("#EmpLastName");
const addressField = By.css("#EmpAddress");
const stateField = By.css("#StateID");
const cityField = By.css("#CityObj_CityName");
const departmentField = By.css("#DepartmentID");

class NewEmployeePageModel extends BasePageModel {
    constructor(driver)
    {
        super(driver);
        this.driver = driver;
        this.timeout = timeout;
    }

    isPageLoaded = async () => {
        return await this.isElementDisplayed(createButton);
    }

    enterFirstName = async () => {
        let data = new DataEntryHelper();
        let value = await data.generateFirstName();
        await this.enterText(firstNameField, value);
        return value;
    }

    enterLastName = async () => {
        let data = new DataEntryHelper();
        let value = await data.generateLastName();
        await this.enterText(lastNameField, value);
        return value;
    }

    enterAddress = async () => {
        let data = new DataEntryHelper();
        let value = await data.generateAddress();
        await this.enterText(addressField, value);
        return value;
    }

    selectRandomState = async () => {
        let value = await this.selectRandomFromDropdown(stateField);
        return value;
    }

    enterCity = async () => {
        let data = new DataEntryHelper();
        let value = await data.generateCity();
        await this.enterText(cityField, value);
        return value;
    }

    selectRandomDepartment = async () => {
        let value = await this.selectRandomFromDropdown(departmentField);
        return value
    }

    clickCreateButton = async () => {
        await this.clickElement(createButton);
    }
}

module.exports = { NewEmployeePageModel }