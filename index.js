// required packages and routes needed for fuctionalitty within index.js
const inquirer = require('inquirer');
const queries = require('./db/queries');

// Here I defone the main function:
async function main() {
    // Loops main, will continue prompting the user until exit is chosen
    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit'
                ]
            }
        ]);

        // Here a call to appropriate function according to the choice picked by the user
        if (action === 'View all departments') {
            const departments = await queries.viewAllDepartments();
            console.table(departments);
        } else if (action === 'View all roles') {
            const roles = await queries.viewAllRoles();
            console.table(roles);
        } else if (action === 'View all employees') {
            const employees = await queries.viewAllEmployees();
            console.table(employees);
        } else if (action === 'Add a department') {
            const { departmentName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the name of the new department:',
                },
            ]);
            await addDepartment(departmentName);
            console.log('Department added successfully.');
        } else if (action === 'Add a role') {
            const departments = await viewAllDepartments();
            const departmentChoices = departments.map(department => ({ name: department.name, value: department.id}));

            const { title, salary, departmentId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the new role:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary for the new role:',
                },
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'Select the department for the new role:',
                    choices: departmentChoices,
                },
            ]);
            await addRole(title, salary, departmentId);
            console.log('Role added successfully.');
        } else if (action === 'Add an employee') {
            const roles = await viewAllRoles();
            const roleChoices = roles.map(role => ({ name: role.job_title, value: role.role_id}));

            const employees = await viewAllEmployees();
            const managerChoices = employees.map(employee => ({ }))
        } else if (action === 'Update an employee role') {

        } else {
            break;
        }
    }
}

main();