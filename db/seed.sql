USE employee_db;


INSERT INTO department (name)
VALUES ("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO manager (first_name, last_name)
VALUES ("Ashley", "Rodriguez"),
("Sarah", "Lourd"),
("Kevin", "Tupik"),
("John", "Doe"),
("Tom", "Allen");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 75000, 1),
("Sales Person", 60000, 1),
("Lead Engineer", 80000, 2),
("Software Engineer", 70000, 2),
("Accountant", 60000, 3),
("Accounting Manager", 80000, 3),
("Legal Team Lead", 100000, 4),
("Lawyer", 180000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Maria", "Lopez",2, 1 ),
("Ashley", "Rodriguez",1, NULL ),
("Tom", "Allen",3, NULL ),
("Manya", "Azad", 4, 5),
("Sarah", "Lourd", 5, NULL),
("Ellin", "Mark", 6, 2),
("John", "Doe", 7, NULL ),
("Mike", "James", 4, NULL ),
("Kevin", "Tupik", 8, NULL);