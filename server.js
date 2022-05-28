const mysql = require('mysql2');
const inquirer = require("inquirer");
const table = require("console.table");
const { start } = require('repl');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Zgmfx20a!',
      database: 'workers_db'
    },
    console.log(`Connected to the workers_db database.`)
  );

  function Start() {
    inquirer
      .prompt({
        type: "list",
        choices: [
          "Add department",
          "Add role",
          "Add employee",
          "View departments",
          "View roles",
          "View employees",
          "Update employee role",
          "Quit"
        ],
        message: "What would you like to do?",
        name: "option"
      })
      .then(function(result) {
        console.log("You entered: " + result.option);
  
        switch (result.option) {
          case "Add department":
            addDepartment();
            break;
          case "Add role":
            addRole();
            break;
          case "Add employee":
            addEmployee();
            break;
          case "View departments":
            viewDepartment();
            break;
          case "View roles":
            viewRoles();
            break;
          case "View employees":
            viewEmployees();
            break;
          case "Update employee role":
            updateEmployee();
            break;
          default:
            quit();
        }
      });
  }


function addDepartment() {
    inquirer.prompt({   
        type: "input",
        message: "What is the name of the department?",
        name: "department"
    }).then(function(res){
      db.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) {
        if (err) throw err;
        console.table("Successfully Inserted");
    })
    })
}

Start()