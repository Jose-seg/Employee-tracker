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
        if (action === 'View all departments') { // if user chooses to view all departments,then a table with department data is given
            const departments = await queries.viewAllDepartments();
            console.table(departments);
        } else if (action === 'View all roles') { // if user chooses to view all roles,then a table with all the roles is given
            const roles = await queries.viewAllRoles();
            console.table(roles);
        } else if (action === 'View all employees') { // if user chooses to view all employees,then a table with employee data is given
            const employees = await queries.viewAllEmployees();
            console.table(employees);
            // Here is the functionality for the option of adding a new department
        } else if (action === 'Add a department') {
            const { departmentName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the name of the new department:',
                },
            ]);
            await queries.addDepartment(departmentName);
            console.log('Department added successfully.');
            // Here is the functionality for the option of adding a new role
        } else if (action === 'Add a role') { // On line 48 I had to include queries. since it was causing the app to throw an error
            const departments = await queries.viewAllDepartments();
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
            await queries.addRole(title, salary, departmentId);
            console.log('Role added successfully.');
            // Here is the functionality for the option of adding a new employee 
        } else if (action === 'Add an employee') {
            const roles = await queries.viewAllRoles();
            const roleChoices = roles.map(role => ({ name: role.title, value: role.id}));// Changed role.job_title to role.title to fix the undefined issue

            const employees = await queries.viewAllEmployees();
            const managerChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.employee_id }));
            managerChoices.unshift({ name: 'None', value: null });

            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the first name of the new employee:',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the last name of the new employee:',
                },
                {
                    type: 'list',
                    name: 'roleId',
                    nessage: 'Select the role for the new employee:',
                    choices: roleChoices,
                },
                {
                    type: 'list',
                    name: 'managerId',
                    message: 'Select the manager for the new employee:',
                    choices: managerChoices,
                },
            ]);
            await queries.addEmployee(firstName, lastName, roleId, managerId);
            console.log('Employee added successfully.');
            // Here is the functionality for the option of updating an employee role
        } else if (action === 'Update an employee role') {
            const employees = await queries.viewAllEmployees();
            const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id}));

            const roles = await queries.viewAllRoles();
            const roleChoices = roles.map(role => ({ name: role.title, value: role.id}));

            const { employeeId, newRoleId } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Select the employee to update their role:',
                    choices: employeeChoices,
                },
                {
                    type: 'list',
                    name: 'newRoleId',
                    message: 'Select the new role for the employee:',
                    choices: roleChoices,
                },
            ]);
            await queries.updateEmployeeRole(employeeId, newRoleId);
            console.log('Employee role has been successfully updated.');
        } else if (action === 'Exit') {
            break;
        }
    }
}

main();