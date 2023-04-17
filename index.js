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

        } else if (action === 'View all roles') {

        } else if (action === 'View all employees') {

        } else if (action === 'Add a department') {

        } else if (action === 'Add a role') {

        } else if (action === 'Add an employee') {

        } else if (action === 'Update an employee role') {

        } else {
            break;
        }
    }
}

main();