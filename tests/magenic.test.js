const { timeout, driver } = require('./base-test');
const { LoginPageModel } = require('../pagemodel/loginpagemodel');
const { HomePageModel } = require("../pagemodel/homepagemodel");
const { EmployeePageModel } = require('../pagemodel/employeepagemodel');
const { Employee } = require("../datamodel/employee");
const { del } = require('selenium-webdriver/http');

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

    test('AddDeleteEmployee', async () => {
        let employeePage = new EmployeePageModel(this.driver);
        await employeePage.openPage();
        expect(await employeePage.isPageLoaded()).toBe(true);
        let createNewEmployee = await employeePage.clickCreateNewLink();
        expect(await createNewEmployee.isPageLoaded()).toBe(true);
        
        let expectedEmployee = new Employee(await createNewEmployee.enterFirstName(), 
                                await createNewEmployee.enterLastName(), 
                                await createNewEmployee.enterAddress(), 
                                await createNewEmployee.selectRandomState(), 
                                await createNewEmployee.enterCity(), 
                                await createNewEmployee.selectRandomDepartment());
        
        await createNewEmployee.clickCreateButton();
        expect(await employeePage.isPageLoaded()).toBe(true);
        let actualEmployee = await employeePage.getLastRow();
        expect(expectedEmployee).toEqual(actualEmployee);
        let deleteEmployeePage = await employeePage.clickDeleteOnLastEntry();
        expect(await deleteEmployeePage.isPageLoaded()).toBe(true);
        await deleteEmployeePage.clickDeleteButton();
        expect(await employeePage.isPageLoaded()).toBe(true);
        let lastRowEmployee = await employeePage.getLastRow();
        expect(lastRowEmployee).not.toEqual(expectedEmployee);
    });
    
    afterAll(async () => {
        await this.driver.close();
    });
})