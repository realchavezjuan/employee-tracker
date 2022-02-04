const inquirer = require('inquirer');
const {getDepartments} = require('./src/queries.js');


const initialPrompt = () => {

    console.log(`
    -------------------------------------------------
    `);

    return inquirer.prompt([ 
        {
            type: 'list',
            name: 'request',
            message: 'What do you want to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'and update an employee role']
        }
    ]).then(promptData => {
        // promptData.request equals the answer from the prompt in a string format
        switch (promptData.request){
            case 'view all departments': 
                getDepartments();
            break;
            case 'view all roles': 
                console.log('view roles');
            break;
            case 'view all employees': 
                console.log('employess');
            break;
            case 'add a department': 
                console.log('add dep');
            break;
            case 'add a role': 
                console.log('add role');
            break;
            case 'add an employee': 
                console.log('add staff');
            break;
            case 'and update an employee role': 
                console.log('update');
            break;

        }

    }).then(initialPrompt);
};

initialPrompt();