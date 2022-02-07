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
    const sql = `SELECT role.title, department.name, employee.first_name FROM role LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id`

    db.query(sql, (err, row) => {
        if(err){console.log(err.message)};
        // else
        console.table(row);
        // call initial prompt again after query
        initialPrompt();
    });
};

const getEmployees = () => {
    const sql = "SELECT employee.id, employee.first_name, employee.second_name, role.title, role.salary, CONCAT(manager.first_name, ' ', manager.second_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN employee manager on manager.id = employee.manager_id;";

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
    ]).then(promptData => {
        const sql = `INSERT INTO department (name)
        VALUES (?)`;
        const params = [promptData.department_name]
        db.query(sql, params, (err, rows) => {
            if(err) {console.log(err.message)};
            // else
            console.log(`
            ${promptData.department_name} added to departments.
            `);
            // call initial prompt again after query
            initialPrompt();
        });
    })
};

const addRole = () => {
    // prompt for more information
    inquirer.prompt([
        {
            type: 'text',
            name: 'role_title',
            message: 'What is the name of the role you want to add?'
        },
        {
            type: 'text',
            name: 'role_salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'text',
            name: 'role_department',
            message: 'In what department is this role?'
        }
    ]).then(promptData => {
        const sql = `INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`;
        const params = [promptData.role_title, promptData.role_salary, promptData.role_department];
        db.query(sql, params, (err, rows) => {
            if(err) {console.log(err.message)};
            // else
            console.log(`
            ${promptData.role_title} added to roles.
            `);
            // call initial prompt again after query
            initialPrompt();
        });
    })
};

const addEmployee = () => {
   // prompt for more information
   inquirer.prompt([
    {
        type: 'text',
        name: 'first_name',
        message: 'What is the first name of this employee?'
    },
    {
        type: 'text',
        name: 'second_name',
        message: 'What is the second name of this employee?'
    },
    {
        type: 'text',
        name: 'employees_role',
        message: 'What is the role for this employee?'
    }
    ]).then(promptData => {
        const sql = `INSERT INTO employee (first_name, second_name, role_id)
        VALUES (?, ?, ?)`;
        const params = [promptData.first_name, promptData.second_name, promptData.role_id]
        db.query(sql, params, (err, rows) => {
            if(err) {console.log(err.message)};
            // else
            console.log(`
            ${promptData.first_name} ${promptData.second_name} added to employees.
            `);
            // call initial prompt again after query
            initialPrompt();
        });
    })
};

const updateEmployeesRole = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee_role_change',
            message: 'What employee do you want change roles?'
        },
        {
            type: 'text',
            name: 'new_role',
            message: 'What is the new role id for this employee?'
        }
    ]).then(promptData => {
        const sql = 'UPDATE employee SET role_id = ? WHERE employee.id = ?';
        const params = [promptData.employee_name, promptData.new_role];
        db.query(sql, params, (err, rows) => {
            if(err) {console.log(err.message)};
            // else
            console.log(`
            ${promptData.employee_id} changed roles to ${promptData.new_role_id}.
            `);
            // call initial prompt again after query
            initialPrompt();
        })
    })
}

const initialPrompt = () => {
    inquirer.prompt([ 
        {
            type: 'list',
            name: 'request',
            message: 'What do you want to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ]).then(promptData => {

        console.log(`
        -------------------------------------------------`);

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
                addDepartment();
            break;
            case 'add a role': 
                addRole();
            break;
            case 'add an employee': 
                addEmployee();
            break;
            case 'update an employee role': 
                updateEmployeesRole();
            break;
        }
    });
};

initialPrompt();