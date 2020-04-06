DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;

CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE manager (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary INTEGER(7) NOT NULL,
  department_id INTEGER NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(30) NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INTEGER(30),
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);
