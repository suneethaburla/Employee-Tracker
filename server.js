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
                    "Update Employee Manager",
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
                    case "Update Employee Manager":
                        updateManager();
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
            console.log(`Added ${answer.department} to the database`);
            start();
        })

}

async function addRole() {
    const departments = await db.findAll("department");
    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));
    inquirer
        .prompt(
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
                message: "Please choose the department of the new role",
            }
        )
        .then(answer => {
            db.createRole(answer);
            console.log(`Added ${answer.title} to the database`);
            start();
        })

}


async function addEmployee() {
    const departments = await db.findAll("department");
    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));
    const roles = await db.findAll("role");
    const roleChoices = roles.map(({ department_id, title }) => ({
        title: title,
        value: department_id
    }));
    
    inquirer
        .prompt(
            {
                name: "first_name",
                type: "input",
                message: "Please enter the first name",
            },
            {
                name: "last_name",
                type: "input",
                message: "Please enter the last name",
            },
            {
                name: "department_id",
                type: "list",
                choices: departmentChoices,
                message: "Please choose the department",
            },
            {
                name: "role_id",
                type: "list",
                choices: roleChoices,
                message: "Please choose the role",
            },
            {
                name: "manager_id",
                type: "list",
                choices: managerChoices,
                message: "Please choose the manager",
            }
        )
        .then(answer => {
            db.createEmployee(answer);
            console.log(`Added ${answer.first_name} " " ${answer.last_name} to the database`);
            start();
        })

}


async function removeDepartment() {
	const departments = await db.findAllDepartments();

	const departmentChoices = departments.map(({ name, id}) => ({
        name: name,
        value:id
    }));
    console.log(departments);

	inquirer
        .prompt(
            {
                name: "department",
                type: "list",
                message: "Select the department to remove",
                choices:departmentChoices
            }
        )
        .then(answer => {
            db.deleteDepartment(answer);
            console.log(`Removed ${answer.department} from the database`);
            start();
        })
}

async function removeRole() {
	const roles = await db.findAllRoles();

	const roleChoices = roles.map(({ name, id}) => ({
        name: name,
        value:id
    }));
    console.log(roles);

	inquirer
        .prompt(
            {
                name: "role",
                type: "list",
                message: "Select the role to remove",
                choices:roleChoices
            }
        )
        .then(answer => {
            db.deleteRole(answer);
            console.log(`Removed ${answer.role} from the database`);
            start();
        })
}

async function removeEmployee() {
	const employees = await db.findAllEmployees();

	const employeeChoices = employees.map(({ name, id}) => ({
        name: name,
        value:id
    }));
    console.log(roles);

	inquirer
        .prompt(
            {
                name: "employee",
                type: "list",
                message: "Select the employee to remove",
                choices:employeeChoices
            }
        )
        .then(answer => {
            db.deleteEmployee(answer);
            console.log(`Removed ${answer.employee} from the database`);
            start();
        })
}

start()

