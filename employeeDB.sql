
DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;



CREATE TABLE employees (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  title VARCHAR(30) NOT NULL,
  department VARCHAR(30) NOT NULL,
  salary INTEGER(5) NOT NULL,
  manager VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
USE employee_db;
SELECT * FROM employees;

INSERT INTO employees (first_name, last_name, title, department, salary, manager)
VALUES ("Suneetha", "Burla", "Software Developer","IT", 100000, "Emmanuel Jucaban" ),
("Paul", "Han", "Software Developer","IT", 110000, "Musa Akbari" ),
("James", "Geib", "DevOps Engineer","DevOps", 120000, "Amanda Hicks" ),
("Manya", "Azad", "Release Manager","PMO", 140000, "Pooja Hegde" ),
("Ellin", "Tj", "Software Developer","IT", 120000, "Emmanuel Jucaban" ),
("Aaron", "Hill", "Program Manager","PMO", 110000, "Pooja Hegde" )
;

-- what would you like to do?
-- View All Employees
-- View All Employees by department
-- View All Employees by manager
-- Add Employee
-- Remove Employee
-- Update Employee Role
-- Update Employee Manager
-- View All Roles

