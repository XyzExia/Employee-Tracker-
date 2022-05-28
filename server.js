const mysql = require('mysql2');
const inquirer = require("inquirer");
const table = require("console.table");

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'workers_db'
    },
    console.log(`Connected to the workers_db database.`)
  );

