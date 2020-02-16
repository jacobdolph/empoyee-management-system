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
            runManagementQuery();

        })
}