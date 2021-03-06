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
      password: '',
      database: ''
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
      .then(function(res) {
        console.log("You entered: " + res.option);
  
        switch (res.option) {
          case "Add department":
            //done
            addDepartment();
            break;
          case "Add role":
            //done
            addRole();
            break;
          case "Add employee":
            //done
            addEmployee();
            break;
          case "View departments":
            //done
            viewDepartment();
            break;
          case "View roles":
            //done
            viewRoles();
            break;
          case "View employees":
            //done
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
      db.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, res) {
        if (err) throw err;
        console.table(res);
    })
    Start();
    })
}

function addEmployee(){
  inquirer.prompt([{
    type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employees role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employees manager's ID?"

  }]).then(function(res){
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, res) {
      if (err) throw err;
      console.table(res);
    })
    Start();
    })
  }
  
 function addRole(){
  inquirer.prompt([
    {
        message: "enter title:",
        type: "input",
        name: "title"
    }, {
        message: "enter salary:",
        type: "number",
        name: "salary"
    }, {
        message: "enter department ID:",
        type: "number",
        name: "department_id"
    }
]).then(function (res) {
    db.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [res.title, res.salary, res.department_id], function (err, res) {
      if (err) throw err;
      console.table(res);
    })
    Start();
})

}

function viewEmployees(){
  db.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.table(res)
    Start();
  })
}

function viewDepartment(){
  db.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.table(res)
    Start();
  })
}

function viewRoles(){
  db.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err;
    console.table(res)
    Start();
  })
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "eeUpdate"
      },

      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
      }
    ])
    .then(function(res) {
      db.query('UPDATE employee SET role_id=? WHERE first_name=?',[res.updateRole, res.eeUpdate], function(err, res) {
        if (err) throw err;
        console.table(res);
        Start();
      });
    });
}

function quit() {
  db.end();
  process.exit();
}



Start()