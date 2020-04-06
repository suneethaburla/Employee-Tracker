const connection = require('./connection');

class DB {
	constructor(connection) {
		this.connection = connection;
	}
	createEmployee(employee) {
		return this.connection.query('INSERT INTO employee SET ?', employee);
	}
	createRole(role) {
		return this.connection.query('INSERT INTO role SET ?', role);
	}
	createDepartment(department) {
		return this.connection.query('INSERT INTO department SET ?', department);
	}
	findAllEmployees() {
		return this.connection.query(
			`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id 
    LEFT JOIN department on role.department_id = department.id LEFT JOIN manager on employee.manager_id = manager.id;`
		);
    }
    findAllRoles() {
		return this.connection.query(
			`SELECT role.id, role.title, department.name AS department, role.salary FROM role 
    LEFT JOIN department on role.department_id = department.id;`
		);
	}
	findAllDepartments() {
		return this.connection.query(
			`SELECT department.id, department.name AS department, SUM(role.salary) AS TotalWages FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP By department.id;`
		);
	}
	deleteEmployee(employeeId) {
		return this.connection.query('DELETE FR0M  employee WHERE id = ?', employeeId);
	}
	deleteRole(roleId) {
		return this.connection.query('DELETE FROM role WHERE id = ?', roleId);
		
	}
	deleteDepartment(departmentId) {
		return this.connection.query('DELETE FROM  department WHERE id = ?', departmentId);
	}
	updateRole(roleId) {
		return this.connection.query('UPDATE role SET id = ? WHERE id=?', roleId);
	}
}

module.exports = new DB(connection);
