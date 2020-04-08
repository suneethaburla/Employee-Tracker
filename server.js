const inquirer = require("inquirer");
const cTable = require('console.table');
const mysql = require("mysql");
const db = require('./db');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db',
})
function start() {
    connection.connect(function start() {
        inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "View All Roles",
                    "View All Departments",
                    "Add Employee",
                    "Add Role",
                    "Add Department",
                    "Remove Employee",
                    "Remove Role",
                    "Remove Department",
                    "Update Employee Role",
                    "Exit"
                ]
            })
            .then(answer => {
                switch (answer.action) {
                    case "View All Employees":
                        viewAllEmployees();
                        break;
                    case "View All Roles":
                        viewAllRoles();
                        break;
                    case "View All Departments":
                        viewAllDepartments();
                        break;
                    case "Add Employee":
                        addEmployee();
                        break;
                    case "Add Role":
                        addRole();
                        break;
                    case "Add Department":
                        addDepartment();
                        break;
                    case "Remove Employee":
                        removeEmployee();
                        break;
                    case "Remove Role":
                        removeRole();
                        break;
                    case "Remove Department":
                        removeDepartment();
                        break;
                    case "Update Employee Role":
                        updateRole();
                        break;
                    case "Exit":
                        process.exit(-1);
                        return;
                }
            });
    });
}


async function viewAllEmployees() {
    const employees = await db.findAll("employee");
    console.table(`${employees.length} employees found:`, employees);
    start();
}

async function viewAllRoles() {
    const roles = await db.findAll("role");
    console.table(`${roles.length} roles found:`, roles);
    start();
}

async function viewAllDepartments() {
    const departments = await db.findAll("department");
    console.table(`${departments.length} departments found:`, departments);
    start();
}


async function addDepartment() {
    inquirer
        .prompt(
            {
                name: "department",
                type: "input",
                message: "Please enter the name of the department",
            }
        )
        .then(answer => {
            db.createDepartment(answer.department);
            console.log(`Added ${answer.department} new department to the database`);
            start();
        })

}

async function addRole() {
    const departments = await db.findAll("department");
    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));
    // console.log("departments",departments);
    // console.log("departmentChoices",departmentChoices);
    const employees = await db.findAll("employee");
    const employeeChoices = employees.map(({ first_name,last_name,manager_id, role_id, id }) => ({
        first_name: first_name,
        last_name:last_name,
        manager_id:manager_id,
        role_id:role_id,
        value: id
    }));
    // console.log("employees",employees);
    // console.log("employeechoices", employeeChoices);
    console.log("findAllEmployees")
    const allEmployees= await db.findAllEmployee();
    console.log(allEmployees);
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "Please enter the title of the new role",
            },
            {
                name: "salary",
                type: "input",
                message: "Please enter the salary of the new role",
            },
            {
                name: "department_id",
                type: "list",
                choices: departmentChoices,
                message: "Please choose the department id of the new role",
            }
        ])
        .then(answer => {
            console.log("answer", answer);
            db.createRole(answer);
            console.log(`Added ${answer.title} role to the database`);
            start();
        })

}

async function addEmployee() {

    const roles = await db.findAll("role");
    const roleChoices = roles.map(({ id, title }) => ({
        id: id,
        value: id
    }));
    console.log("roles",roles);
    console.log("roleChoices",roleChoices);
    
    const employees = await db.findAll("employee");
    const employeeChoices = employees.map(({ first_name,last_name,manager_id, role_id, id }) => ({
        first_name: first_name,
        last_name:last_name,
        manager_id:manager_id,
        role_id:role_id,
        value: id
    }));
    console.log("employees",employees);
    console.log("employeechoices", employeeChoices);

    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the first name",
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the last name",
            },
            {
                name: "role_id",
                type: "list",
                choices: roleChoices,
                message: "What is the employee's role id",
            },
            {
                name: "manager_id",
                type: "list",
                choices: employeeChoices,
                message: "What is the employee's manager id",
            }
        ])
        .then(answer => {
            console.log("---------------")
            console.log(answer)
            console.log("---------------")
            db.createEmployee(answer);
            console.log(`Added ${answer.first_name} ${answer.last_name} new employee to the database`);
            start();
        })

}


async function removeDepartment() {
    const departments = await db.findAll("department");
    const departmentChoices = departments.map(({ name, id }) => ({
        name: name,
        value: id
    }));

    inquirer
        .prompt(
            {
                name: "department",
                type: "list",
                message: "Select the department to remove",
                choices: departmentChoices
            }
        )
        .then(answer => {
            db.deleteDepartment(answer.department);
            console.log(`Removed ${answer.department} from the database`);
            start();
        })
}

async function removeRole() {
    const roles = await db.findAll("role");
    const roleChoices = roles.map(({ title, id }) => ({
        title: title,
        value: id
    }));
    console.log(roles);
    console.log(roleChoices)

    inquirer
        .prompt(
            {
                name: "roleId",
                type: "list",
                message: "Select the role to remove",
                choices: roleChoices
            }
        )
        .then(answer => {
            db.deleteRole(answer.roleId);
            console.log(`Removed role Id ${answer.roleId} from the database`);
            start();
        })
}

async function removeEmployee() {
    const employees = await db.findAll("employee");
    const employeeChoices = employees.map(({ name, id }) => ({
        name: name,
        value: id
    }));

    inquirer
        .prompt(
            {
                name: "employeeId",
                type: "list",
                message: "Select the employee to remove",
                choices: employeeChoices
            }
        )
        .then(answer => {
            console.log(answer)
            db.deleteEmployee(answer.employeeId);
            console.log(`Removed ${answer.employeeId} employee from the database`);
            start();
        })
}

async function updateRole() {
    const employees = await db.findAll("employee");
    const employeeChoices = employees.map(({ first_name, id }) => ({
        first_name: first_name,
        value: id
    }));
    
    const roles = await db.findAll("role");
    const roleChoices = roles.map(({ title, id }) => ({
        title: title,
        value: id
    }));
    console.log(roles);
    console.log(roleChoices)

    inquirer
        .prompt([
            {
                name: "oldRoleId",
                type: "list",
                message: "Which employee's role you want to update",
                choices: roleChoices
            },
            {
                name: "newRoleId",
                type: "list",
                message: "Select the new role of the employee",
                choices: roleChoices
            }
        ])
        .then(answer => {
            console.log(answer)
            console.log(answer.oldRoleId)
            console.log(answer.newRoleId)
            db.updateRole(answer);
            console.log("hello")
            console.log(`UPdated role Id of the employee from ${answer.oldRoleId} to ${answer.newRoleId} in the database`);
            start();
        })
}

start()

