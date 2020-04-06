USE employee_db;


INSERT INTO department (name)
VALUES 
("Sales"),
("Finance"),
("Legal"),
("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Lead", 100000.00, 1),
("Sales Person", 750000, 1),
("Accountant", 125000, 2),
("Analyst", 120000, 2),
("Lawyer", 190000, 3),
("Legal Team Lead", 225000, 3),
("Software Engineer", 150000, 4),
("Mechanical Engineer", 150000, 4),
("Lead Engineer", 200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, 3),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 9, null),
("Kevin", "Tupik", 7, 3),
("Malia", "Brown", 3, null),
("Sarah", "Lourd", 6, null),
("Tom", "Allen", 5, 6),
("Christian", "Eckenrode", 8, 3);

