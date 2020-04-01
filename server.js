const inquirer = require("inquirer");
const cTable = require('console.table');
const mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
});


function start() {
    connection.connect(function start() {
        inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "View All Employees by department",
                    "View All Employees by manager",
                    "Add Employee",
                    "Remove Employee",
                    "Update Employee Role",
                    "Update Employee Manager",
                    "View All Roles",
                    "View All Departments",
                    "Exit"
                ]
            })
            .then(answer => {
                switch (answer.action) {
                    case "View All Employees":
                        viewAllEmployees();
                        break;
                    case "View All Employees by department":
                        searchByDept();
                        break;
                    case "View All Employees by manager":
                        searchByManager();
                        break;
                    //   case "Add Employee":
                    //     addEmployee();
                    //     break;
                    case "Remove Employee":
                        removeEmployee();
                        break;
                    case "Update Employee Role":
                        updateRole();
                        break;
                    //   case "Update Employee Manager":
                    //     updateManager();
                    //     break;
                    case "View All Roles":
                        viewAllRoles();
                        break;
                    case "View All Departments":
                        viewAllDepts();
                        break;
                    case "Exit":
                        return;
                }
            });
    });
}

function viewAllEmployees() {
    const query = `SELECT * FROM employees;`;
    connection.query(query, (err, employee) => {
        if (err) throw err;
        console.table(`${employee.length} Employees found:`, employee);
        start();
    });
}

function viewAllRoles() {
    const query = `SELECT title FROM employees;`;
    connection.query(query, (err, employee) => {
        if (err) throw err;
        console.table(`${employee.length} Roles found:`, employee);
        start();
    });
}

function viewAllDepts() {
    const query = `SELECT department FROM employees;`;
    connection.query(query, (err, employee) => {
        if (err) throw err;
        console.table(`${employee.length} departments found:`, employee);
        start();
    });
}

function searchByDept() {
    inquirer
        .prompt({
            name: "department",
            type: "list",
            message: "Please select a department",
            choices: [
                "IT",
                "DevOps",
                "PMO"
            ]
        })
        .then(answer => {
            viewByDept(answer.department);
        })
}

function viewByDept(department) {
    console.log(department);
    const query = `SELECT id, first_name, last_name, title, manager FROM employees WHERE department="${department}";`;
    connection.query(query, (err, employee) => {
        if (err) throw err;
        console.table(employee);
        start();
    });
}

function searchByManager() {
    inquirer
        .prompt({
            name: "manager",
            type: "list",
            message: "Please select a manager",
            choices: [
                "Emmanuel Jucaban",
                "Pooja Hegde",
                "Musa Akbari"
            ]
        })
        .then((choice) => {
            console.log(choice);
            const query = `SELECT id, first_name, last_name, title FROM employees WHERE manager="${choice}";`;
    connection.query(query, (err, employee) => {
        if (err) throw err;
        console.table(employee);
        start();
    });
        }
        )
}

function viewByMgr(choice) {
    console.log(choice);
    
}

function removeEmployee() {
    inquirer
        .prompt([{
            name: "firstName",
            type: "input",
            message: "Please enter the first name of the employee",
        },
        {
            name: "lastName",
            type: "input",
            message: "Please enter the last name of the employee",
        }]
        )
        .then(function ({ firstName, lastName }) {
            const query = `DELETE FROM employees WHERE first_name = "${firstName}" and last_name = "${lastName}";`;
    connection.query(query, (err, employee) => {
        if (err) throw err;
        console.table(employee);
        start();
})
        })
}

function updateRole() {
    inquirer
        .prompt([{
            name: "firstName",
            type: "input",
            message: "Please enter the first name of the employee",
        },
        {
            name: "lastName",
            type: "input",
            message: "Please enter the last name of the employee",
        },
        {
            name: "newRole",
            type: "input",
            message: "Please enter the new role of the employee",
        }
    ]
        )
        .then((firstName, lastName, newRole) => {
            const query = `UPDATE employees SET title = "${newRole}" WHERE first_name = "${firstName}" and last_name = "${lastName}";;`;
    connection.query(query, (err, employee) => {
        if (err) throw err;
        console.table(employee);
        start();
})
})
}

start()

