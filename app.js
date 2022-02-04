const inquirer = require('inquirer');
const db = require('./db/connection');

const initialPrompt = () => {

    console.log(`
    ==================
    Let's Get Started!
    ==================
    `);

    return inquirer.prompt([ 
        {
            type: 'list',
            name: 'name',
            message: 'What do you want to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'and update an employee role']
        },
        {
            type: 'text',
            name: 'id',
            message: 'What is their id?'
        }
    ]);
};

const sql = `SELECT * FROM departments`;

db.query(sql, (err, rows) => {
    
    console.log(rows);
});
