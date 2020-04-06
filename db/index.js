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
		return this.connection.query(`INSERT INTO department (name) VALUES ("${department}")`);
	}

	findAll(input) {
		return this.connection.query(
			`SELECT * FROM ${input}`);
		
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
