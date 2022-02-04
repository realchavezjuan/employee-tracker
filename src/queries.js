const db = require('../db/connection');
const cTable = require('console.table');

const getDepartments = (callback) => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
    console.table(rows);
    });

    callback;
}

module.exports = {getDepartments};