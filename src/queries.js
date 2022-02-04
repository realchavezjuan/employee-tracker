const db = require('../db/connection');
const cTable = require('console.table');

const getDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
    console.table(rows);
    });

}

module.exports = {getDepartments};