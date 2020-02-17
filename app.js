const mysql = require("mysql");
const express = require("express");
const inquirer = require("inquirer");
var app = express();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "company_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to the employee management system!")
    runManagementQuery();
});

function runManagementQuery() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add Departments, Roles, or Employees?",
                "View Departments, Roles, or Employees?",
                "Update Employee Roles",
                "exit"
            ]
        })
        .then(function (answer) {
            console.log(answer);
            switch (answer.action) {
                case "Add Departments, Roles, or Employees?":
                    console.log("time to make the add function");
                    runAddQuery();
                    break;

                case "View Departments, Roles, or Employees?":
                    console.log("time to make the view function")
                    runManagementQuery();
                    break;
                case "Update Employee Roles":
                    console.log("time to make the update function");
                    runManagementQuery();
                    break;
                case "exit":
                    connection.end();
                    break;
            }
        })
};

function runAddQuery() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to add?",
            choices: [
                "Add Departments",
                "Add Role",
                "Add Employee",
                "Go back"
            ]
        })
        .then(function (add) {
            console.log(add.action);
            switch (add.action) {
                case "Add Departments":
                    addDepartment();
                    break;
                case "Add Role":
                    console.log("time to add the add role function");
                    runManagementQuery();
                    break;
                case "Add Employee":
                    console.log("time to add employee function")
                    addEmployee();
                    break;
                case "Go back":
                    console.log("Returning you to the beginning");
                    runManagementQuery();
                    break;
            }


        })
}

function addDepartment() {
    inquirer
        .prompt({
            name: "dep",
            type: "input",
            message: "What is the name of the department you would like to add?"
        })
        .then(function (department) {
            console.log(department.dep)
            var query = "INSERT INTO department (name) VALUES (?)";
            var addDep = department.dep;

            connection.query(query, addDep, function (err, result) {
                if (err) throw err;
                console.log("Department added: " + department.dep);
                runManagementQuery();
            })
        })
};
function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Please enter the FIRST name of the new employee"
            },
            {
                name: "lastName",
                type: "input",
                message: "Please enter the LAST name of the new employee"
            },
            {
                name: "roleId",
                type: "rawlist",
                message: "What is the role of the new employee?",
                choices: [
                    "Qa specialist",
                    "Sr content writer",
                    "Content Specialist",
                    "Software engineer",
                    "Sr developer",
                    "Sr account rep",
                    "Outbound sales rep",
                    "Ux designer",
                    "Product manager"
                ]
            }, {
                name: "managerId",
                type: "rawlist",
                message: "Who is the new employees manager?",
                choices: [
                    "Ugo Ducket - QA Director",
                    "Brenelle Cubley - Sr. Developer",
                    "Brigitta Rosoni - Sr. Developer",
                    "Percy Veltman - Sr. Developer",
                    "Dante Collins - Director UX",
                    "Matteo Gobeaux - COO",
                    "Brent Grasha - CMO",
                    "Erica Romaguera - CTO",
                    "Dathyl Judd - SVP Sales",
                    "Irwin Spinello - VP Product"
                ]
            }
        ])
        .then(function (newEmployee) {
            console.log(newEmployee)
            var query = "INSERT INTO employee (first_name, last_name,role_id,manager_id) VALUES ?"
            var roleId;
            var managerId;
            switch (newEmployee.roleId) {
                case "Qa specialist":
                    roleId = 2;
                    break;
                case "Sr content writer":
                    roleId = 5;
                    break;
                case "Content Specialist":
                    roleId = 6;
                    break;
                case "Software engineer":
                    roleId = 8;
                    break;
                case "Sr account rep":
                    roleId = 12;
                    break;
                case "Outbound sales rep":
                    roleId = 13;
                    break;
                case "Ux designer":
                    roleId = 16;
                    break;
                case "Product manager":
                    roleId = 19;
                    break;
            }
            switch (newEmployee.managerId) {
                case "Ugo Ducket - QA Director":
                    managerId = 9;
                    break;
                case "Brenelle Cubley - Sr. Developer":
                    managerId = 10;
                    break;
                case "Brigitta Rosoni - Sr. Developer":
                    managerId = 11;
                    break;
                case "Percy Veltman - Sr. Developer":
                    managerId = 12;
                    break;
                case "Dante Collins - Director UX":
                    managerId = 13;
                    break;
                case "Matteo Gobeaux - COO":
                    managerId = 2;
                    break;
                case "Brent Grasha - CMO":
                    managerId = 3;
                    break;
                case "Erica Romaguera - CTO":
                    managerId = 4;
                    break;
                case "Dathyl Judd - SVP Sales":
                    managerId = 6;
                    break;
                case "Irwin Spinello - VP Product":
                    managerId = 8;
                    break;
            }
            var post = {
                first_name: newEmployee.firstName,
                last_name: newEmployee.lastName,
                role_id: roleId,
                manager_id: managerId
            }
            connection.query(query, post, function (err, result) {
                if (err) throw err;
                console.log("Employee Added: " + newEmployee.firstName + " " + newEmployee.lastName)
            })

            connection.end();
        })
}