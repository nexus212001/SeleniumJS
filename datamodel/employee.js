class Employee {
    constructor(firstname, lastname, address, state, city, department)
    {
        this.firstName = firstname;
        this.lastName = lastname;
        this.address = address;
        this.state = state;
        this.city = city;
        this.department = department;
    }
}

module.exports = { Employee }