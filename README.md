# MYSQL Employee-Tracker
This project describes how to architect and build a solution for managing a company's employees using node, inquirer, and MySQL

## Instructions

The following database schema containing three tables has been designed:

![Database Schema](Assets/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  
A command-line application was built that allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Remove departments, roles, employees

  * Update employee roles


```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```


![Employee Tracker](Assets/employee-tracker.gif)

