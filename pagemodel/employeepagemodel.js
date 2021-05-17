const { BasePageModel } = require("./basepagemodel");
const { NewEmployeePageModel } = require("./newemployeepagemodel");
const { By } = require("selenium-webdriver");
const { timeout } = require("../tests/base-test");
const { Employee } = require("../datamodel/employee");
const { DeleteEmployeePageModel } = require("./deleteemployeepagemodel");

const pageUrl = 'http://magenicautomation.azurewebsites.net/Employees';

const createNewLink = By.css("a[href='/Employees/Create']");
const cityRow = By.css("td:nth-child(1)");
const departmentRow = By.css("td:nth-child(2)");
const stateRow = By.css("td:nth-child(3)");
const firstNameRow = By.css("td:nth-child(4)");
const lastNameRow = By.css("td:nth-child(5)");
const addressRow = By.css("td:nth-child(6)");
const relativeDeleteLink = By.css(".//a[text()='Delete']");

class EmployeePageModel extends BasePageModel {
    constructor(driver)
    {
        super(driver);
        this.driver = driver;
        this.timeout = timeout;
    }

    openPage = async() =>
    {
        await this.navigateToUrl(pageUrl);
    }

    isPageLoaded = async() =>
    {
        return await this.isElementDisplayed(createNewLink);
    }

    clickCreateNewLink = async() =>
    {
        await this.clickElement(createNewLink);
        return new NewEmployeePageModel(this.driver);
    }

    getLastRow = async () => {
        let lastRow = await this.driver.findElement(By.css("table tr:last-child"));
        let city = await lastRow.findElement(cityRow).getText();
        let department = await lastRow.findElement(departmentRow).getText();
        let state = await lastRow.findElement(stateRow).getText();
        let firstName = await lastRow.findElement(firstNameRow).getText();
        let lastName = await lastRow.findElement(lastNameRow).getText();
        let address = await lastRow.findElement(addressRow).getText();
        return new Employee(firstName, lastName, address, state, city, department);
    }

    clickDeleteOnLastEntry = async () => {
        await this.clickElement(By.css("table tr:last-child a:nth-child(3)"));
        return new DeleteEmployeePageModel(this.driver);
    }

    /// Not yet implemented correctly
    clickDeleteButtonFor = async (employee) => {
        let rows = await this.driver.findElements(By.css("table tbody tr"));
        for (let count = 0; count < rows.length; count++) {
            let row = rows[count];
            let city = await row.findElement(cityRow).getText();
            let department = await row.findElement(departmentRow).getText();
            let state = await row.findElement(stateRow).getText();
            let firstName = await row.findElement(firstNameRow).getText();
            let lastName = await row.findElement(lastNameRow).getText();
            let address = await row.findElement(addressRow).getText();
            if (city == employee.city && department == employee.department && state == employee.state &&
                firstName == employee.firstName && lastName == employee.lastName && address == employee.address) {
                await row.findElement(relativeDeleteLink).click();
                break;
            }
        }
        // await rows.forEach(async (row) => {
        //     let city = await row.findElement(cityRow).getText();
        //     let department = await row.findElement(departmentRow).getText();
        //     let state = await row.findElement(stateRow).getText();
        //     let firstName = await row.findElement(firstNameRow).getText();
        //     let lastName = await row.findElement(lastNameRow).getText();
        //     let address = await row.findElement(addressRow).getText();
        //     if (city == employee.city && department == employee.department && state == employee.state &&
        //         firstName == employee.firstName && lastName == employee.lastName && address == employee.address) {
        //         await row.findElement(relativeDeleteLink).click();
        //     }
        // });

        return new DeleteEmployeePageModel(this.driver);
    }
}

module.exports = { EmployeePageModel }