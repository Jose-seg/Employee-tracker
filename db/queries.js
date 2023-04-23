// connection for the connection.js file in db folder
const connection = require('./connection');

// functions for the Queries

const viewAllDepartments = async () => {
    const query = 'SELECT * FROM department';
    const [rows] = await connection.promise().query(query);
    return rows;
};

const viewAllRoles = async () => {
    const query = `
        SELECT 
            role.id AS id,
            role.title AS title,
            department.name AS department,
            role.salary
        FROM role
        JOIN department ON role.department_id = department.id    
        `;
    const [rows] = await connection.promise().query(query);
    return rows;
};

const viewAllEmployees = async () => {
    const query = `
        SELECT
            e.id AS employee_id,
            e.first_name,
            e.last_name,
            role.title AS job_title,
            department.name AS department,
            role.salary,
            CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id
        `;
        const [rows] = await connection.promise().query(query);
        return rows;
};

const addDepartment = async (name) => {
    const query = 'INSERT INTO department (name) VALUES (?)';
    const [result] = await connection.promise().query(query, [name]);
    return result;
};

const addRole = async (title, salary, departmentId) => {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    const [result] = await connection.promise().query(query, [title, salary, departmentId]);
    return result;
};

const addEmployee = async (firstName, lastName, roleId, managerId) => {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    const [result] = await connection.promise().query(query, [firstName, lastName, roleId, managerId]);
    return result;
};

const updateEmployeeRole = async (employeeId, newRoleId) => {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const [result] = await connection.promise().query(query, [newRoleId, employeeId]);
    return result;
};

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};