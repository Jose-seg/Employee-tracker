// connection for the connection.js file in db folder
const connection = require('./connection');

// functions for the Queries

const viewAllDepartments = async () => {
    const query = 'SELECT * FROM department';
    const [rows] = (await connection.promise()).query(query);
    return rows;
};

const viewAllRoles = async () => {
    const query = `
        SELECT 
            role.id AS role_id,
            role.title AS job_title,
            department.name AS department,
            role.salary
        FROM role
        JOIN department ON role.department_id = department.id    
        `;
    const [rows] = (await connection.promise()).query(query);
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
        const [rows] = (await connection.promise()).query(query);
        return rows;
};