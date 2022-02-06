const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

const getDepartments = () => {
    const sql = `SELECT department.name FROM department`;

    db.query(sql, (err, rows) => {
        if(err) {console.log(err.message)};
        // else
        console.table(rows);
        // call initial prompt again after query
        initialPrompt();
    });
};

const getRoles = () => {
    const sql = `SELECT role.title FROM role`
    db.query(sql, (err, row) => {
        if(err){console.log(err.message)};
        // else
        console.table(row);
        // call initial prompt again after query
        initialPrompt();
    });
};

const getEmployees = () => {
    const sql = `SELECT employee.first_name, employee.second_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id`
    db.query(sql, (err, row) => {
        if(err){console.log(err.message)};
        // else
        console.table(row);
        // call initial prompt again after query
        initialPrompt();
    });
};

const addDepartment = () => {

    // prompt for more information
    inquirer.prompt([
        {
            type: 'text',
            name: 'department_name',
            message: 'What is the name of the department you want to add?'
        }
    ])

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;

    db.query(sql, (err, rows) => {
        if(err) {console.log(err.message)};
        // else
        console.table(rows);
        // call initial prompt again after query
        initialPrompt();
    });
};

const addRole = () => {

    // prompt for more information
    inquirer.prompt([
        {
            type: 'text',
            name: 'role_name',
            message: 'What is the name of the department you want to add?'
        }
    ])

    const sql = `SELECT department.name FROM department`;

    db.query(sql, (err, rows) => {
        if(err) {console.log(err.message)};
        // else
        console.table(rows);
        // call initial prompt again after query
        initialPrompt();
    });
};

const addEmployee = () => {

    // prompt for more information
    inquirer.prompt([
        {
            type: 'text',
            name: 'first_name',
            message: 'What is the name of the department you want to add?'
        }
    ])

    const sql = `SELECT department.name FROM department`;

    db.query(sql, (err, rows) => {
        if(err) {console.log(err.message)};
        // else
        console.table(rows);
        // call initial prompt again after query
        initialPrompt();
    });
};


const initialPrompt = () => {
    inquirer.prompt([ 

        {
            type: 'list',
            name: 'request',
            message: 'What do you want to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'and update an employee role']
        }
    ]).then(promptData => {

        console.log(`-------------------------------------------------`);

        // promptData.request equals the answer from the prompt in a string format
        switch (promptData.request){
            case 'view all departments': 
                getDepartments();
            break;
            case 'view all roles': 
                getRoles();
            break;
            case 'view all employees': 
                getEmployees();
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
    });
};

initialPrompt();